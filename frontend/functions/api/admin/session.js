// GET /api/admin/session
import { json, route } from "../../_lib/http.js";

export const onRequest = route({
    GET: ({ data }) => json({ authenticated: data.authenticated === true })
});
