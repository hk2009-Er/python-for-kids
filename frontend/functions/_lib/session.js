// Stateless admin session: base64url(JSON payload) + "." + base64url(HMAC-SHA256).

export const COOKIE_NAME = "pfk_admin";
export const SESSION_SECONDS = 12 * 60 * 60;
const COOKIE_ATTRS = "HttpOnly; Secure; SameSite=Strict; Path=/api/admin";

const encoder = new TextEncoder();

function toBase64Url(bytes) {
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text) {
    if (!/^[A-Za-z0-9_-]*$/.test(text)) return null;
    try {
        const padded = text.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((text.length + 3) % 4);
        const binary = atob(padded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return bytes;
    } catch {
        return null;
    }
}

function hmacKey(secret) {
    return crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
    );
}

export function isConfigured(env) {
    return typeof env.ADMIN_PASSWORD === "string" && env.ADMIN_PASSWORD.length > 0 &&
        typeof env.SESSION_SECRET === "string" && env.SESSION_SECRET.length > 0;
}

// Constant-time password check: compare HMACs of both values, so the
// comparison is over fixed-length digests regardless of input length.
export async function passwordMatches(env, candidate) {
    if (!isConfigured(env) || typeof candidate !== "string" || candidate.length === 0) {
        return false;
    }
    const key = await hmacKey(env.SESSION_SECRET);
    const [a, b] = await Promise.all([
        crypto.subtle.sign("HMAC", key, encoder.encode("pw:" + candidate)),
        crypto.subtle.sign("HMAC", key, encoder.encode("pw:" + env.ADMIN_PASSWORD))
    ]);
    const x = new Uint8Array(a);
    const y = new Uint8Array(b);
    let diff = x.length ^ y.length;
    for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
    return diff === 0;
}

export async function createSessionCookie(env) {
    const payload = { exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS };
    const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
    const key = await hmacKey(env.SESSION_SECRET);
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode("session:" + body)));
    const value = body + "." + toBase64Url(signature);
    return `${COOKIE_NAME}=${value}; ${COOKIE_ATTRS}; Max-Age=${SESSION_SECONDS}`;
}

export function clearSessionCookie() {
    return `${COOKIE_NAME}=; ${COOKIE_ATTRS}; Max-Age=0`;
}

function readCookie(request, name) {
    const header = request.headers.get("cookie") || "";
    for (const part of header.split(";")) {
        const index = part.indexOf("=");
        if (index === -1) continue;
        if (part.slice(0, index).trim() === name) return part.slice(index + 1).trim();
    }
    return null;
}

export async function hasValidSession(request, env) {
    if (!isConfigured(env)) return false;

    const value = readCookie(request, COOKIE_NAME);
    if (!value || value.length > 1024) return false;

    const parts = value.split(".");
    if (parts.length !== 2) return false;

    const payloadBytes = fromBase64Url(parts[0]);
    const signature = fromBase64Url(parts[1]);
    if (!payloadBytes || !signature) return false;

    // crypto.subtle.verify compares in constant time.
    const key = await hmacKey(env.SESSION_SECRET);
    const valid = await crypto.subtle.verify("HMAC", key, signature, encoder.encode("session:" + parts[0]));
    if (!valid) return false;

    try {
        const payload = JSON.parse(new TextDecoder().decode(payloadBytes));
        return Number.isFinite(payload.exp) && payload.exp > Date.now() / 1000;
    } catch {
        return false;
    }
}
