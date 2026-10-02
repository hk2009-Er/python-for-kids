import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

import lessonData from "../data/lessonData";

import {
    runPython,
    preloadPython,
    getPythonStatus,
    onPythonStatusChange,
    normalizeOutput,
    needsDesktopPython
} from "../utils/pythonRunner";

import {
    isExerciseSolved,
    markExerciseSolved,
    getTotalXP,
    getDraft,
    saveDraft,
    clearDraft
} from "../utils/progress";

import "./Exercise.css";


const STARTER_CODE = "# Write your code below 👇\n";
const INDENT = "    ";


/* Flat list of every exercise, in topic order. */
function getAllExercises() {

    const all = [];

    lessonData.forEach(topic => {

        (topic.exercises || []).forEach(exercise => {

            all.push({
                ...exercise,
                topicTitle: topic.title,
                topicSlug: topic.slug,
                topicIcon: topic.icon,
                topicLevel: topic.level
            });

        });

    });

    return all;
}


/* Turtle graphics can't run in the browser. */
function isTurtle(exercise) {
    return Boolean(exercise.turtle) || needsDesktopPython(exercise.answer);
}


function difficultyClass(difficulty) {

    const d = String(difficulty || "Easy").toLowerCase();

    if (d === "medium") return "medium";
    if (d === "hard") return "hard";

    return "easy";
}


/*
    Insert text at the cursor. execCommand keeps the browser's
    undo history working (Ctrl+Z); fall back to setRangeText.
*/
function insertText(textarea, text) {

    let ok = false;

    try {
        ok = text === ""
            ? document.execCommand("delete", false)
            : document.execCommand("insertText", false, text);
    } catch {
        ok = false;
    }

    if (!ok) {
        textarea.setRangeText(
            text,
            textarea.selectionStart,
            textarea.selectionEnd,
            "end"
        );

        textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }
}


class Exercise extends Component {

    constructor(props) {
        super(props);

        // Saved drafts / progress are read in componentDidMount so the
        // prerendered HTML and the first client render match.
        this.state = {
            code: STARTER_CODE,
            stdin: "",
            output: "",
            error: null,
            tip: null,
            notice: null,
            running: false,
            runMode: null,          // "run" | "check"
            pythonStatus: getPythonStatus(),
            showHint: false,
            showAnswer: false,
            result: null,           // null | "success" | "fail"
            solved: false,
            xpGained: 0,
            expected: null,
            actual: "",
            totalXP: 0
        };

        this.editorRef = React.createRef();
        this.gutterRef = React.createRef();
    }


    componentDidMount() {

        this.mounted = true;

        const exercise = this.getExercise();
        const draft = exercise ? getDraft(exercise.id) : null;

        // oxlint-disable-next-line react/no-did-mount-set-state -- read browser-only storage after hydration
        this.setState({
            code: draft || STARTER_CODE,
            solved: exercise ? isExerciseSolved(exercise.id) : false,
            totalXP: getTotalXP()
        });

        this.unsubscribe = onPythonStatusChange(status => {
            if (this.mounted) {
                this.setState({ pythonStatus: status });
            }
        });
    }


    componentWillUnmount() {

        this.mounted = false;

        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }


    getExercise() {

        const id = String(this.props.exerciseId);

        return getAllExercises().find(
            exercise => String(exercise.id) === id
        );
    }


    /* ---------------- Editor ---------------- */

    handleCodeChange = (event) => {

        const code = event.target.value;

        this.setState({ code, result: null });

        const exercise = this.getExercise();

        if (exercise) {
            saveDraft(exercise.id, code);

            if (!isTurtle(exercise)) {
                preloadPython();
            }
        }
    };


    handleKeyDown = (event) => {

        const textarea = event.target;
        const { selectionStart, selectionEnd, value } = textarea;

        if (event.key === "Tab") {

            event.preventDefault();

            const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;

            if (event.shiftKey) {

                // Remove up to 4 spaces at the start of the line
                const leading = value.slice(lineStart).match(/^ {1,4}/);

                if (leading) {
                    textarea.setSelectionRange(
                        lineStart,
                        lineStart + leading[0].length
                    );
                    insertText(textarea, "");

                    const newPos = Math.max(
                        lineStart,
                        selectionStart - leading[0].length
                    );
                    textarea.setSelectionRange(newPos, newPos);
                }

                return;
            }

            if (selectionStart !== selectionEnd &&
                value.slice(selectionStart, selectionEnd).includes("\n")) {

                // Indent every selected line
                const block = value.slice(lineStart, selectionEnd);
                const indented = block
                    .split("\n")
                    .map(line => INDENT + line)
                    .join("\n");

                textarea.setSelectionRange(lineStart, selectionEnd);
                insertText(textarea, indented);
                return;
            }

            insertText(textarea, INDENT);
            return;
        }

        if (event.key === "Enter" && !event.shiftKey &&
            !event.ctrlKey && !event.metaKey) {

            event.preventDefault();

            const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
            const currentLine = value.slice(lineStart, selectionStart);
            const indent = (currentLine.match(/^[ \t]*/) || [""])[0];

            // Extra indent after a line ending with ":" (if, for, def...)
            const extra = /:\s*(#.*)?$/.test(currentLine) ? INDENT : "";

            insertText(textarea, "\n" + indent + extra);
            return;
        }

        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            event.preventDefault();
            this.handleRun();
        }
    };


    syncScroll = () => {

        if (this.gutterRef.current && this.editorRef.current) {
            this.gutterRef.current.scrollTop =
                this.editorRef.current.scrollTop;
        }
    };


    /* ---------------- Actions ---------------- */

    handleRun = async () => {

        const exercise = this.getExercise();

        if (!exercise || this.state.running || isTurtle(exercise)) {
            return;
        }

        this.setState({
            running: true,
            runMode: "run",
            output: "",
            error: null,
            tip: null,
            notice: null,
            result: null
        });

        const res = await runPython(this.state.code, {
            stdin: this.state.stdin
        });

        if (!this.mounted) {
            return;
        }

        this.setState({
            running: false,
            runMode: null,
            output: res.stdout,
            error: res.error,
            tip: res.tip,
            notice: this.inputNotice(res)
        });
    };


    inputNotice(res) {

        if (res.ranOutOfInput) {
            return "💬 Your program asked for input, but the Input box ran out of lines. Type your answers in the Input box (one per line)!";
        }

        return null;
    }


    handleCheck = async () => {

        const exercise = this.getExercise();

        if (!exercise || this.state.running || isTurtle(exercise)) {
            return;
        }

        const code = this.state.code;

        const withoutComments = code
            .split("\n")
            .filter(line => line.trim() && !line.trim().startsWith("#"))
            .join("\n");

        if (!withoutComments.trim()) {
            this.setState({
                result: "fail",
                output: "",
                error: null,
                tip: null,
                notice: "✏️ Write some code first, then press Check!"
            });
            return;
        }

        if (exercise.usesInput && !this.state.stdin.trim()) {
            this.setState({
                result: null,
                notice: "💬 This program uses input(). Type something in the Input box first so your program has something to read!"
            });
            return;
        }

        this.setState({
            running: true,
            runMode: "check",
            output: "",
            error: null,
            tip: null,
            notice: null,
            result: null
        });

        const stdin = this.state.stdin;
        const mine = await runPython(code, { stdin });

        if (!this.mounted) {
            return;
        }

        const base = {
            running: false,
            runMode: null,
            output: mine.stdout,
            error: mine.error,
            tip: mine.tip,
            actual: mine.programOutput,
            notice: this.inputNotice(mine)
        };

        if (mine.error) {
            this.setState({ ...base, result: "fail" });
            return;
        }

        const printedSomething =
            normalizeOutput(mine.programOutput).trim() !== "";

        let passed = false;

        if (exercise.flexible) {

            passed = printedSomething;

        } else {

            const expected = await runPython(exercise.answer || "", { stdin });

            if (!this.mounted) {
                return;
            }

            if (expected.error) {
                // Answer itself can't run here - be kind and accept working code.
                passed = printedSomething;
            } else {
                passed =
                    normalizeOutput(mine.programOutput) ===
                    normalizeOutput(expected.programOutput);

                if (!passed) {
                    base.expected = expected.programOutput;
                }
            }
        }

        if (passed) {
            this.celebrate(exercise, base);
        } else {
            this.setState({
                ...base,
                expected: base.expected || null,
                result: "fail",
                notice: printedSomething
                    ? base.notice
                    : "🤔 Your program didn't print anything. Did you forget print()?"
            });
        }
    };


    celebrate(exercise, extraState = {}) {

        const firstTime = markExerciseSolved(exercise.id, exercise.points);

        this.setState({
            ...extraState,
            running: false,
            runMode: null,
            result: "success",
            solved: true,
            expected: null,
            xpGained: firstTime ? Number(exercise.points) || 0 : 0,
            totalXP: getTotalXP()
        });
    }


    handleTurtleDone = () => {

        const exercise = this.getExercise();

        if (exercise) {
            this.celebrate(exercise);
        }
    };


    toggleHint = () => {
        this.setState(prev => ({ showHint: !prev.showHint }));
    };


    toggleAnswer = () => {
        this.setState(prev => ({ showAnswer: !prev.showAnswer }));
    };


    useAnswer = () => {

        const exercise = this.getExercise();

        if (!exercise) {
            return;
        }

        this.setState({ code: exercise.answer || "", result: null });
        saveDraft(exercise.id, exercise.answer || "");
    };


    handleReset = () => {

        const exercise = this.getExercise();

        if (exercise) {
            clearDraft(exercise.id);
        }

        this.setState({
            code: STARTER_CODE,
            output: "",
            error: null,
            tip: null,
            notice: null,
            result: null,
            expected: null,
            showHint: false,
            showAnswer: false
        });
    };


    /* ---------------- Render ---------------- */

    renderNotFound() {

        return (

            <div className="exercise-page">

                <section className="exercise-content">

                    <div className="exercise-panel exercise-not-found">

                        <div className="exercise-not-found-icon">🔍</div>

                        <h2>Exercise not found 😕</h2>

                        <p>
                            We couldn't find that exercise.
                            Maybe it moved, or the link has a typo.
                        </p>

                        <Link
                            to="/exercises"
                            className="ex-btn primary"
                        >
                            ← Back to Exercises
                        </Link>

                    </div>

                </section>

            </div>
        );
    }


    renderOutput() {

        const {
            running, runMode, pythonStatus, output, error, tip, notice
        } = this.state;

        let body;

        if (running) {

            body = pythonStatus === "loading"
                ? (
                    <div className="ex-output-status">
                        <span className="ex-snake">🐍</span>
                        Warming up Python... (the first time takes a few seconds)
                    </div>
                )
                : (
                    <div className="ex-output-status">
                        <span className="ex-spinner" />
                        {runMode === "check" ? "Checking your code..." : "Running..."}
                    </div>
                );

        } else if (!output && !error && !notice) {

            body = (
                <div className="ex-output-placeholder">
                    Press ▶ Run to see what your code does!
                </div>
            );

        } else {

            body = (
                <>
                    {output && <pre className="ex-output-text">{output}</pre>}

                    {!output && !error && (
                        <div className="ex-output-placeholder">
                            (Your program didn't print anything)
                        </div>
                    )}

                    {error && (
                        <div className="ex-error">
                            <strong>🐛 Oops! {error}</strong>
                            {tip && <p>💡 {tip}</p>}
                        </div>
                    )}
                </>
            );
        }

        return (

            <div className="ex-output">

                <div className="ex-output-header">▶ Output</div>

                <div className="ex-output-body">
                    {body}
                </div>

                {notice && !running && (
                    <div className="ex-notice">{notice}</div>
                )}

            </div>
        );
    }


    render() {

        const exercise = this.getExercise();

        if (!exercise) {
            return this.renderNotFound();
        }

        const all = getAllExercises();
        const index = all.findIndex(e => String(e.id) === String(exercise.id));
        const prev = index > 0 ? all[index - 1] : null;
        const next = index < all.length - 1 ? all[index + 1] : null;

        const {
            code, stdin, running, showHint, showAnswer,
            result, solved, xpGained, totalXP, expected
        } = this.state;

        const lineCount = code.split("\n").length;
        const lineNumbers = Array.from(
            { length: lineCount },
            (_, i) => i + 1
        ).join("\n");

        const diff = exercise.difficulty || "Easy";


        return (

            <div className="exercise-page">

                {/* HEADER */}

                <section className="exercise-header">

                    <div className="exercise-header-inner">

                        <Link to="/exercises" className="back-link">
                            ← Back to Exercises
                        </Link>

                        <div className="exercise-title">

                            <span>{exercise.topicIcon || "🧩"}</span>

                            <div>

                                <p>
                                    <Link to={`/lesson/${exercise.topicSlug}`}>
                                        {exercise.topicTitle}
                                    </Link>
                                    {" "}• Exercise {index + 1} of {all.length}
                                </p>

                                <h1>
                                    {exercise.title}
                                    {solved && (
                                        <span className="ex-solved-badge">✅ Solved</span>
                                    )}
                                </h1>

                            </div>

                        </div>

                    </div>

                </section>


                {/* CONTENT */}

                <section className="exercise-content">

                    <div className="exercise-panel">

                        <div className="ex-meta">

                            <span className={`ex-difficulty ${difficultyClass(diff)}`}>
                                {diff}
                            </span>

                            <span className="ex-points">
                                ⭐ {exercise.points || 0} XP
                            </span>

                            <span className="ex-total-xp">
                                🏆 Your XP: {totalXP}
                            </span>

                        </div>


                        <div className="ex-task">
                            <h2>🎯 Your Mission</h2>
                            <p>{exercise.description}</p>
                        </div>


                        {isTurtle(exercise) && (

                            <div className="ex-turtle-note">

                                <div className="ex-turtle-icon">🐢</div>

                                <div>
                                    <strong>This one draws pictures with turtle!</strong>
                                    <p>
                                        Turtle graphics can't run inside the browser.
                                        Write your code here, then copy it into
                                        {" "}<b>IDLE</b> or <b>Thonny</b> on your computer
                                        and run it there. When your drawing works,
                                        come back and press “I did it!”
                                    </p>

                                    <button
                                        className="ex-btn success"
                                        onClick={this.handleTurtleDone}
                                        disabled={solved && result === "success"}
                                    >
                                        🎉 I did it!
                                    </button>
                                </div>

                            </div>

                        )}


                        {/* EDITOR */}

                        <div className="ex-editor">

                            <div className="ex-editor-header">

                                <span>🐍 main.py</span>

                                <span className="ex-editor-tip">
                                    Tab = 4 spaces • Ctrl+Enter = Run
                                </span>

                            </div>

                            <div className="ex-editor-body">

                                <pre
                                    className="ex-gutter"
                                    ref={this.gutterRef}
                                    aria-hidden="true"
                                >
                                    {lineNumbers}
                                </pre>

                                <textarea
                                    ref={this.editorRef}
                                    className="ex-textarea"
                                    value={code}
                                    onChange={this.handleCodeChange}
                                    onKeyDown={this.handleKeyDown}
                                    onScroll={this.syncScroll}
                                    spellCheck={false}
                                    autoCapitalize="off"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    wrap="off"
                                    aria-label="Python code editor"
                                    rows={Math.max(8, Math.min(lineCount + 2, 22))}
                                />

                            </div>

                        </div>


                        {/* INPUT */}

                        {exercise.usesInput && (

                            <div className="ex-input">

                                <label htmlFor="ex-stdin">
                                    ⌨️ Input for your program
                                    <span> (one answer per line - input() reads these in order)</span>
                                </label>

                                <textarea
                                    id="ex-stdin"
                                    value={stdin}
                                    onChange={e => this.setState({ stdin: e.target.value })}
                                    placeholder={"e.g.\nAlex\n10"}
                                    rows={3}
                                    spellCheck={false}
                                />

                            </div>

                        )}


                        {/* BUTTONS */}

                        <div className="ex-actions">

                            <button
                                className="ex-btn run"
                                onClick={this.handleRun}
                                disabled={running || isTurtle(exercise)}
                            >
                                ▶ Run
                            </button>

                            <button
                                className="ex-btn primary"
                                onClick={this.handleCheck}
                                disabled={running || isTurtle(exercise)}
                            >
                                ✅ Check
                            </button>

                            <button
                                className={showHint ? "ex-btn hint active" : "ex-btn hint"}
                                onClick={this.toggleHint}
                            >
                                💡 Hint
                            </button>

                            <button
                                className={showAnswer ? "ex-btn secondary active" : "ex-btn secondary"}
                                onClick={this.toggleAnswer}
                            >
                                👀 {showAnswer ? "Hide Answer" : "Show Answer"}
                            </button>

                            <button
                                className="ex-btn ghost"
                                onClick={this.handleReset}
                                disabled={running}
                            >
                                ↺ Reset
                            </button>

                        </div>


                        {showHint && (
                            <div className="ex-hint">
                                <strong>💡 Hint:</strong> {exercise.hint || "Read the mission carefully and try one step at a time!"}
                            </div>
                        )}


                        {showAnswer && (

                            <div className="ex-answer">

                                <div className="ex-answer-header">
                                    <span>👀 One possible answer</span>
                                    <button onClick={this.useAnswer}>
                                        Copy to editor
                                    </button>
                                </div>

                                <pre><code>{exercise.answer}</code></pre>

                                <p>
                                    Try to understand each line - then type it
                                    yourself to really learn it!
                                </p>

                            </div>

                        )}


                        {/* OUTPUT */}

                        {!isTurtle(exercise) && this.renderOutput()}


                        {/* RESULT */}

                        {result === "success" && (

                            <div className="ex-success">

                                <div className="ex-confetti" aria-hidden="true">
                                    {["🎉", "⭐", "🎊", "✨", "🐍", "🏆", "🎈", "💫"].map((c, i) => (
                                        <span key={i} style={{ "--i": i }}>{c}</span>
                                    ))}
                                </div>

                                <div className="ex-success-title">
                                    🎉 Awesome! You solved it!
                                </div>

                                <p>
                                    {xpGained > 0
                                        ? `+${xpGained} XP earned! You now have ${totalXP} XP.`
                                        : "You already solved this one before - great practice!"}
                                </p>

                                {next && (
                                    <Link
                                        to={`/exercise/${next.id}`}
                                        className="ex-btn success"
                                    >
                                        Next challenge →
                                    </Link>
                                )}

                            </div>

                        )}


                        {result === "fail" && !running && (

                            <div className="ex-fail">

                                <strong>Not quite yet - keep going! 💪</strong>

                                {expected != null && !this.state.error && (

                                    <div className="ex-compare">
                                        <p>Your output doesn't match what we expected:</p>
                                        <div className="ex-compare-grid">
                                            <div>
                                                <span>Expected</span>
                                                <pre>{normalizeOutput(expected) || "(nothing)"}</pre>
                                            </div>
                                            <div>
                                                <span>Yours</span>
                                                <pre>{normalizeOutput(this.state.actual) || "(nothing)"}</pre>
                                            </div>
                                        </div>
                                        <p className="ex-compare-tip">
                                            Check spelling, spaces, capital letters and punctuation!
                                        </p>
                                    </div>

                                )}

                            </div>

                        )}

                    </div>


                    {/* NAVIGATION */}

                    <div className="ex-nav">

                        {prev ? (
                            <Link
                                to={`/exercise/${prev.id}`}
                                className="ex-btn secondary"
                            >
                                ← {prev.title}
                            </Link>
                        ) : <span />}

                        <Link to="/exercises" className="ex-btn ghost">
                            🧩 All Exercises
                        </Link>

                        {next ? (
                            <Link
                                to={`/exercise/${next.id}`}
                                className="ex-btn primary"
                            >
                                {next.title} →
                            </Link>
                        ) : <span />}

                    </div>

                </section>

            </div>
        );
    }
}


/*
    React Router doesn't pass params to class components,
    so a small wrapper reads them. The key resets the page
    state when moving to another exercise.
*/
function ExerciseWithParams(props) {

    const { exerciseId } = useParams();

    return (
        <Exercise
            {...props}
            key={exerciseId}
            exerciseId={exerciseId}
        />
    );
}


export default ExerciseWithParams;
