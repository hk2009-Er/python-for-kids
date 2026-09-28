// PUT /api/admin/topics/:slug {topic}, DELETE /api/admin/topics/:slug
import { error, json, route } from "../../../_lib/http.js";
import { checkTopic } from "../../../_lib/topics.js";

export const onRequest = route({
    async PUT({ env, params, data }) {
        const slug = params.slug;
        const exists = await env.DB.prepare("SELECT 1 FROM topics WHERE slug = ?1").bind(slug).first();
        if (!exists) return error(404, "Topic not found");

        const input = data.body && data.body.topic;
        if (input && typeof input === "object" && input.slug !== slug) {
            return error(400, "Slug cannot be changed", [`Expected slug "${slug}".`]);
        }

        const check = await checkTopic(env.DB, input, { ignoreSlug: slug });
        if (!check.ok) return error(check.status, check.error, check.details);

        const topic = check.topic;
        const result = await env.DB
            .prepare("UPDATE topics SET data = ?1, updated_at = ?2 WHERE slug = ?3")
            .bind(JSON.stringify(topic), new Date().toISOString(), slug)
            .run();
        if (!result.meta || result.meta.changes === 0) return error(404, "Topic not found");

        return json({ topic });
    },

    async DELETE({ env, params }) {
        const result = await env.DB.prepare("DELETE FROM topics WHERE slug = ?1").bind(params.slug).run();
        if (!result.meta || result.meta.changes === 0) return error(404, "Topic not found");
        return json({ ok: true });
    }
});
