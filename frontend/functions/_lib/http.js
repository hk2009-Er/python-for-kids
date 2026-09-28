// Small helpers shared by the Pages Functions.

export function json(body, status = 200, headers = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-Content-Type-Options": "nosniff",
            ...headers
        }
    });
}

export function error(status, message, details) {
    const body = { error: message };
    if (details && details.length > 0) body.details = details;
    return json(body, status);
}

export function methodNotAllowed(allowed) {
    return json({ error: "Method not allowed" }, 405, { Allow: allowed.join(", ") });
}

// Dispatch on method: route({ GET: fn, POST: fn })
export function route(handlers) {
    return (context) => {
        const handler = handlers[context.request.method];
        return handler ? handler(context) : methodNotAllowed(Object.keys(handlers));
    };
}

export const MAX_BODY_BYTES = 512 * 1024;

// Reads the body as UTF-8 text, refusing anything over `limit` bytes
// even when Content-Length is absent or wrong.
export async function readBodyText(request, limit = MAX_BODY_BYTES) {
    const declared = Number(request.headers.get("content-length"));
    if (Number.isFinite(declared) && declared > limit) {
        return { tooLarge: true };
    }
    if (!request.body) return { text: "" };

    const reader = request.body.getReader();
    const chunks = [];
    let size = 0;

    for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > limit) {
            await reader.cancel();
            return { tooLarge: true };
        }
        chunks.push(value);
    }

    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return { text: new TextDecoder().decode(bytes) };
}
