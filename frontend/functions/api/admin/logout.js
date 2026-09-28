// POST /api/admin/logout
import { json, route } from "../../_lib/http.js";
import { clearSessionCookie } from "../../_lib/session.js";

export const onRequest = route({
    POST: () => json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() })
});
