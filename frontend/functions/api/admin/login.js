// POST /api/admin/login {password}
import { error, json, route } from "../../_lib/http.js";
import { isConfigured, passwordMatches, createSessionCookie } from "../../_lib/session.js";

const MAX_FAILURES = 5;
const WINDOW_SECONDS = 15 * 60;

export const onRequest = route({
    async POST({ request, env, data }) {
        if (!isConfigured(env)) return error(500, "Admin is not configured");

        const ip = request.headers.get("cf-connecting-ip") || "unknown";
        const now = Math.floor(Date.now() / 1000);
        const windowFloor = now - WINDOW_SECONDS;

        const row = await env.DB
            .prepare("SELECT failures, window_start FROM login_attempts WHERE ip = ?1")
            .bind(ip)
            .first();

        if (row && row.window_start > windowFloor && row.failures >= MAX_FAILURES) {
            const retryAfter = Math.max(1, row.window_start + WINDOW_SECONDS - now);
            return json(
                { error: "Too many failed attempts. Try again in a few minutes." },
                429,
                { "Retry-After": String(retryAfter) }
            );
        }

        const password = data.body && typeof data.body.password === "string" ? data.body.password : "";

        if (!(await passwordMatches(env, password))) {
            await env.DB
                .prepare(
                    `INSERT INTO login_attempts (ip, failures, window_start) VALUES (?1, 1, ?2)
                     ON CONFLICT (ip) DO UPDATE SET
                        failures = CASE WHEN window_start <= ?3 THEN 1 ELSE failures + 1 END,
                        window_start = CASE WHEN window_start <= ?3 THEN ?2 ELSE window_start END`
                )
                .bind(ip, now, windowFloor)
                .run();
            return error(401, "Wrong password");
        }

        await env.DB.batch([
            env.DB.prepare("DELETE FROM login_attempts WHERE ip = ?1").bind(ip),
            // Housekeeping: forget stale rows from other IPs.
            env.DB.prepare("DELETE FROM login_attempts WHERE window_start <= ?1").bind(windowFloor)
        ]);

        return json({ ok: true }, 200, { "Set-Cookie": await createSessionCookie(env) });
    }
});
