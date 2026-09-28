// GET /api/admin/topics, POST /api/admin/topics {topic}
import { error, json, route } from "../../../_lib/http.js";
import { listTopics, checkTopic } from "../../../_lib/topics.js";

export const onRequest = route({
    async GET({ env }) {
        return json({ topics: await listTopics(env.DB) });
    },

    async POST({ env, data }) {
        const input = data.body && data.body.topic;
        const check = await checkTopic(env.DB, input);
        if (!check.ok) return error(check.status, check.error, check.details);

        const topic = check.topic;
        const conflict = () => error(409, `A topic with slug "${topic.slug}" already exists`);

        const exists = await env.DB.prepare("SELECT 1 FROM topics WHERE slug = ?1").bind(topic.slug).first();
        if (exists) return conflict();

        try {
            await env.DB
                .prepare(
                    `INSERT INTO topics (slug, position, data, updated_at)
                     SELECT ?1, COALESCE(MAX(position) + 1, 0), ?2, ?3 FROM topics`
                )
                .bind(topic.slug, JSON.stringify(topic), new Date().toISOString())
                .run();
        } catch (err) {
            if (String(err && err.message).includes("UNIQUE")) return conflict();
            throw err;
        }

        return json({ topic }, 201);
    }
});
