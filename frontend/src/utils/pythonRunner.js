/*
    Runs Python in the browser with Pyodide.

    - Pyodide is only downloaded the first time Python is needed.
    - Code runs inside a Web Worker, so a never-ending loop can be
      stopped by terminating the worker (after TIMEOUT_MS).
    - input() reads lines from a provided stdin string.

    Usage:
        const { stdout, error } = await runPython(code, { stdin });
*/

const PYODIDE_VERSION = "0.29.5";
const PYODIDE_BASE =
    `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

const DEFAULT_TIMEOUT_MS = 5000;
const MAX_OUTPUT_CHARS = 20000;


/*
    Python run before every program: sends print() output to JS,
    and replaces input() with one that reads from the stdin text.
*/
const SETUP_CODE = String.raw`
import sys, builtins

class _PfkStream:
    def __init__(self, kind):
        self.kind = kind
    def write(self, s):
        s = str(s)
        if s:
            _pfk_emit(self.kind, s)
        return len(s)
    def flush(self):
        pass
    def isatty(self):
        return False
    def writable(self):
        return True

sys.stdout = _PfkStream("out")
sys.stderr = _PfkStream("err")

_pfk_lines = _pfk_stdin_text.replace("\r\n", "\n").split("\n")
if _pfk_lines and _pfk_lines[-1] == "":
    _pfk_lines.pop()

_pfk_state = {"ran_out": False, "extra": 0}

def _pfk_input(prompt=""):
    prompt = str(prompt)
    if prompt:
        _pfk_emit("echo", prompt)
    if _pfk_lines:
        line = _pfk_lines.pop(0)
    else:
        _pfk_state["ran_out"] = True
        _pfk_state["extra"] += 1
        if _pfk_state["extra"] > 50:
            raise EOFError("there is no more input to read")
        line = ""
    _pfk_emit("echo", line + "\n")
    return line

builtins.input = _pfk_input

async def _pfk_run(code, ns):
    import traceback
    from pyodide.code import eval_code_async
    try:
        await eval_code_async(code, ns, return_mode="none", filename="<exec>")
    except SystemExit:
        return None
    except BaseException as e:
        return "".join(traceback.format_exception(e))
    return None
`;


/*
    This function is stringified and run inside the worker.
    It must not reference anything from this module.
*/
function workerMain(baseUrl, setupCode, maxChars) {

    let pyodide = null;
    let current = null;

    function emit(kind, text) {

        if (!current) {
            return;
        }

        current.chars += text.length;

        if (current.chars > maxChars) {
            current.tooMuch = true;
            throw new Error("too much output");
        }

        self.postMessage({
            type: "chunk",
            id: current.id,
            kind,
            text
        });
    }

    const ready = (async () => {
        self.importScripts(baseUrl + "pyodide.js");
        pyodide = await self.loadPyodide({ indexURL: baseUrl });
        pyodide.globals.set("_pfk_emit", emit);
    })();

    ready.then(
        () => self.postMessage({ type: "ready" }),
        (err) => self.postMessage({
            type: "loadError",
            error: String((err && err.message) || err)
        })
    );

    self.onmessage = async (event) => {

        const msg = event.data || {};

        if (msg.type !== "run") {
            return;
        }

        try {
            await ready;
        } catch {
            return;
        }

        current = { id: msg.id, chars: 0, tooMuch: false };

        let error = null;
        let ranOutOfInput = false;

        try {
            pyodide.globals.set("_pfk_stdin_text", msg.stdin || "");
            pyodide.runPython(setupCode);

            try {
                await pyodide.loadPackagesFromImports(msg.code);
            } catch {
                // Unknown package - the import error will show when running.
            }

            const namespace = pyodide.globals.get("dict")();

            try {
                pyodide.globals.set("_pfk_code", msg.code);
                pyodide.globals.set("_pfk_ns", namespace);

                const traceback = await pyodide.runPythonAsync(
                    "await _pfk_run(_pfk_code, _pfk_ns)"
                );

                if (traceback) {
                    error = String(traceback);
                }
            } finally {
                try {
                    pyodide.globals.delete("_pfk_ns");
                } catch {
                    // ignore
                }
                namespace.destroy();
            }

        } catch (err) {
            error = String((err && err.message) || err);
        }

        try {
            ranOutOfInput = Boolean(
                pyodide.runPython("_pfk_state['ran_out']")
            );
        } catch {
            ranOutOfInput = false;
        }

        const tooMuch = current.tooMuch;
        current = null;

        self.postMessage({
            type: "done",
            id: msg.id,
            error,
            ranOutOfInput,
            tooMuch
        });
    };
}


/* ---------------- Status (for "Warming up Python...") ---------------- */

let status = "idle"; // "idle" | "loading" | "ready" | "error"
const listeners = new Set();

function setStatus(next) {

    status = next;

    listeners.forEach(fn => {
        try {
            fn(next);
        } catch {
            // ignore listener errors
        }
    });
}

export function getPythonStatus() {
    return status;
}

/* Subscribe to status changes. Returns an unsubscribe function. */
export function onPythonStatusChange(fn) {

    listeners.add(fn);

    return () => listeners.delete(fn);
}


/* ---------------- Worker management ---------------- */

let worker = null;
let readyPromise = null;
let pending = null;
let nextId = 1;
let queue = Promise.resolve();


function killWorker() {

    if (worker) {
        try {
            worker.terminate();
        } catch {
            // ignore
        }
    }

    worker = null;
    readyPromise = null;
}


function finishPending(extra) {

    const run = pending;

    if (!run) {
        return;
    }

    pending = null;
    clearTimeout(run.timer);

    run.resolve({
        stdout: run.display,
        programOutput: run.program,
        error: null,
        errorType: null,
        errorLine: null,
        tip: null,
        timedOut: false,
        ranOutOfInput: false,
        ...extra
    });
}


function handleMessage(msg) {

    if (!pending || msg.id !== pending.id) {
        return;
    }

    if (msg.type === "chunk") {

        pending.display += msg.text;

        if (msg.kind === "out") {
            pending.program += msg.text;
        }

        return;
    }

    if (msg.type === "done") {

        if (msg.tooMuch) {
            finishPending({
                error:
                    "Whoa, that's a LOT of output! 🌊 Your program printed too much, so we stopped it. Is there a loop that never ends?",
                errorType: "TooMuchOutput",
                ranOutOfInput: msg.ranOutOfInput
            });
            return;
        }

        finishPending({
            ...friendlyError(msg.error),
            ranOutOfInput: msg.ranOutOfInput
        });
    }
}


function startWorker() {

    if (readyPromise) {
        return readyPromise;
    }

    setStatus("loading");

    readyPromise = new Promise((resolve, reject) => {

        let settled = false;

        const fail = (reason) => {

            if (settled) {
                return;
            }

            settled = true;
            killWorker();
            setStatus("error");
            reject(new Error(reason));
        };

        let w;

        try {
            const source =
                `(${workerMain.toString()})(` +
                `${JSON.stringify(PYODIDE_BASE)}, ` +
                `${JSON.stringify(SETUP_CODE)}, ` +
                `${MAX_OUTPUT_CHARS});`;

            const blob = new Blob([source], { type: "text/javascript" });
            const url = URL.createObjectURL(blob);

            w = new Worker(url);

            setTimeout(() => URL.revokeObjectURL(url), 10000);

        } catch (err) {
            fail(String((err && err.message) || err));
            return;
        }

        worker = w;

        w.onmessage = (event) => {

            const msg = event.data || {};

            if (msg.type === "ready") {
                settled = true;
                setStatus("ready");
                resolve(w);
                return;
            }

            if (msg.type === "loadError") {
                fail(msg.error);
                return;
            }

            handleMessage(msg);
        };

        w.onerror = (event) => {

            if (event && event.preventDefault) {
                event.preventDefault();
            }

            if (!settled) {
                fail((event && event.message) || "Worker failed to start");
                return;
            }

            finishPending({
                error: "Oops! Python crashed. 😵 Try running your code again.",
                errorType: "Crash"
            });

            killWorker();
            setStatus("idle");
        };
    });

    return readyPromise;
}


/* Start downloading Python early (e.g. when the kid starts typing). */
export function preloadPython() {
    startWorker().catch(() => {});
}


function runOne(code, stdin, timeout) {

    return startWorker().then(

        (w) => new Promise(resolve => {

            const id = nextId++;

            pending = {
                id,
                display: "",
                program: "",
                resolve,
                timer: null
            };

            pending.timer = setTimeout(() => {

                const run = pending;

                if (!run || run.id !== id) {
                    return;
                }

                pending = null;
                killWorker();
                setStatus("idle");

                resolve({
                    stdout: run.display,
                    programOutput: run.program,
                    error:
                        `⏰ Your program took too long (more than ${Math.round(timeout / 1000)} seconds), so we stopped it. Is there a loop that never ends?`,
                    errorType: "Timeout",
                    errorLine: null,
                    tip: "Check that your while loop has a way to stop!",
                    timedOut: true,
                    ranOutOfInput: false
                });

            }, timeout);

            w.postMessage({ type: "run", id, code, stdin });
        }),

        () => ({
            stdout: "",
            programOutput: "",
            error:
                "Couldn't load Python. 📡 Please check your internet connection and try again.",
            errorType: "LoadError",
            errorLine: null,
            tip: null,
            timedOut: false,
            ranOutOfInput: false
        })
    );
}


/*
    Run Python code.

    Resolves (never rejects) with:
    {
        stdout,         // everything shown on screen (incl. input prompts)
        programOutput,  // only print() output (for comparing answers)
        error,          // friendly error text or null
        errorType, errorLine, tip,
        timedOut, ranOutOfInput
    }
*/
export function runPython(code, options = {}) {

    const stdin = options.stdin || "";
    const timeout = options.timeout || DEFAULT_TIMEOUT_MS;

    const job = queue.then(() => runOne(String(code || ""), stdin, timeout));

    queue = job.catch(() => {});

    return job;
}


/* ---------------- Friendly errors ---------------- */

const TIPS = {
    NameError:
        "Python doesn't know that name. Check your spelling, or did you forget quotes around text?",
    SyntaxError:
        "Something is typed in a way Python doesn't understand. Check brackets ( ), quotes \" \" and colons :",
    IndentationError:
        "Check the spaces at the start of your lines. Code inside if/for/while/def needs 4 spaces.",
    TabError:
        "Mixing tabs and spaces confuses Python. Use 4 spaces for indentation.",
    TypeError:
        "You might be mixing different types, like text and numbers. Try str() or int().",
    ValueError:
        "A value isn't the right kind. For example, int(\"hello\") can't become a number.",
    ZeroDivisionError:
        "You can't divide by zero - not even Python can do that!",
    IndexError:
        "You asked for a position that doesn't exist in the list. Remember: counting starts at 0!",
    KeyError:
        "That key isn't in the dictionary. Check the spelling.",
    AttributeError:
        "That thing doesn't have the method or property you used. Check the spelling.",
    ModuleNotFoundError:
        "That module isn't available here.",
    EOFError:
        "Your program asked for more input than you typed in the Input box.",
    RecursionError:
        "A function kept calling itself forever. Make sure it has a stopping point!"
};


export function friendlyError(raw) {

    if (!raw) {
        return {
            error: null,
            errorType: null,
            errorLine: null,
            tip: null
        };
    }

    const text = String(raw);

    const lines = text
        .split("\n")
        .map(l => l.trimEnd())
        .filter(l => l.trim() !== "");

    let last = lines.length ? lines[lines.length - 1].trim() : text.trim();

    // "pyodide.ffi.JsException: ..." etc. - keep the short name
    const typeMatch = last.match(/^([A-Za-z_][\w.]*)(?::\s*(.*))?$/);

    let errorType = null;

    if (typeMatch) {
        const parts = typeMatch[1].split(".");
        errorType = parts[parts.length - 1];

        if (parts.length > 1) {
            last = errorType + (typeMatch[2] ? `: ${typeMatch[2]}` : "");
        }
    }

    let errorLine = null;
    const lineRegex = /File "<exec>", line (\d+)/g;
    let m;

    while ((m = lineRegex.exec(text)) !== null) {
        errorLine = Number(m[1]);
    }

    return {
        error: errorLine ? `${last} (on line ${errorLine})` : last,
        errorType,
        errorLine,
        tip: (errorType && TIPS[errorType]) || null
    };
}


/* ---------------- Helpers ---------------- */

/* Code that can't run in the browser (turtle graphics). */
export function needsDesktopPython(code) {
    return /^\s*(import\s+turtle|from\s+turtle\s+import)/m.test(code || "");
}

/* Compare outputs, ignoring trailing spaces on each line and blank lines at the end. */
export function normalizeOutput(text) {

    const lines = String(text || "")
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map(l => l.trimEnd());

    while (lines.length && lines[lines.length - 1] === "") {
        lines.pop();
    }

    return lines.join("\n");
}
