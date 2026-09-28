// GET /api/content — public, ordered topics for the site.
import { error, route } from "../_lib/http.js";

export const onRequest = route({
    async GET({ env }) {
        if (!env.DB) return error(503, "Content database is not configured");

        const { results } = await env.DB
            .prepare("SELECT data FROM topics ORDER BY position, slug")
            .all();

        // Rows already hold JSON; splice them in without re-parsing.
        const body = '{"topics":[' + results.map(row => row.data).join(",") + "]}";
        return new Response(body, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // no-cache: browsers revalidate each load, so admin edits show up at once.
                "Cache-Control": "no-cache",
                "X-Content-Type-Options": "nosniff"
            }
        });
    }
});
