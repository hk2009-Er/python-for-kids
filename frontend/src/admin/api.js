/*
    Tiny client for the admin API (/api/admin/*).

    Every call resolves with the parsed JSON body or throws an
    ApiError. `err.kind` tells the UI what happened:
        "unauthorized" - session missing/expired -> show login
        "offline"      - API not reachable (network error, 404, HTML)
        "server"       - any other error ({ error, details? })
*/

export class ApiError extends Error {

    constructor(message, { status = 0, kind = "server", details = [] } = {}) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.kind = kind;
        this.details = details;
    }
}

export const OFFLINE_MESSAGE =
    "Admin API not running — start it with `npm run api` (after `npm run build`).";


async function request(method, path, body) {

    const options = {
        method,
        credentials: "same-origin",
        headers: { Accept: "application/json" }
    };

    // The API's CSRF check requires JSON on every non-GET request,
    // including ones without a payload (logout, delete).
    if (method !== "GET") {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body === undefined ? {} : body);
    }

    let response;

    try {
        response = await fetch("/api/admin" + path, options);
    } catch {
        throw new ApiError(OFFLINE_MESSAGE, { kind: "offline" });
    }

    const type = response.headers.get("Content-Type") || "";
    let data = null;

    if (type.includes("application/json")) {
        try {
            data = await response.json();
        } catch {
            data = null;
        }
    }

    // The API always answers JSON. A static server answers unknown
    // /api paths with 404 or index.html (SPA fallback), and a dev
    // proxy with no backend answers 5xx text - so there is no API.
    if (!data && response.status !== 401) {
        throw new ApiError(OFFLINE_MESSAGE, { status: response.status, kind: "offline" });
    }

    if (response.status === 401) {
        throw new ApiError((data && data.error) || "Please log in again.", {
            status: 401,
            kind: "unauthorized"
        });
    }

    if (!response.ok) {
        throw new ApiError(
            (data && data.error) || `Request failed (${response.status}).`,
            {
                status: response.status,
                kind: "server",
                details: (data && Array.isArray(data.details)) ? data.details : []
            }
        );
    }

    return data || {};
}


export function login(password) {
    return request("POST", "/login", { password });
}

export function logout() {
    return request("POST", "/logout", {});
}

export function getSession() {
    return request("GET", "/session");
}

export function listTopics() {
    return request("GET", "/topics");
}

export function createTopic(topic) {
    return request("POST", "/topics", { topic });
}

export function updateTopic(slug, topic) {
    return request("PUT", "/topics/" + encodeURIComponent(slug), { topic });
}

export function deleteTopic(slug) {
    return request("DELETE", "/topics/" + encodeURIComponent(slug));
}

export function saveOrder(slugs) {
    return request("PUT", "/order", { slugs });
}
