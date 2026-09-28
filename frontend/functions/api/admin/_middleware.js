// Runs before every /api/admin/* handler: error handling, CSRF checks,
// body parsing (size-capped) and session auth.
import { error, readBodyText, MAX_BODY_BYTES } from "../../_lib/http.js";
import { hasValidSession } from "../../_lib/session.js";

const PUBLIC_PATHS = new Set(["/api/admin/login", "/api/admin/session"]);
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

async function guard(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "");

    if (!SAFE_METHODS.has(request.method)) {
        const contentType = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
        if (contentType !== "application/json") {
            return error(415, "Content-Type must be application/json");
        }
        if (request.headers.get("origin") !== url.origin) {
            return error(403, "Bad request origin");
        }

        const { text, tooLarge } = await readBodyText(request, MAX_BODY_BYTES);
        if (tooLarge) return error(413, `Request body is larger than ${MAX_BODY_BYTES / 1024} KB`);
        try {
            context.data.body = text.trim() === "" ? {} : JSON.parse(text);
        } catch {
            return error(400, "Request body is not valid JSON");
        }
    }

    context.data.authenticated = await hasValidSession(request, env);

    if (!PUBLIC_PATHS.has(path) && !context.data.authenticated) {
        return error(401, "Not logged in");
    }
    if (!env.DB && path !== "/api/admin/session" && path !== "/api/admin/logout") {
        return error(500, "Content database is not configured");
    }

    return context.next();
}

export async function onRequest(context) {
    let response;
    try {
        response = await guard(context);
    } catch (err) {
        console.error("admin api error", err);
        response = error(500, "Server error");
    }
    // Admin responses must never be cached anywhere.
    response = new Response(response.body, response);
    response.headers.set("Cache-Control", "no-store");
    return response;
}
