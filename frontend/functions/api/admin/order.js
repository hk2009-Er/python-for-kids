// PUT /api/admin/order {slugs: [...]}
import { error, json, route } from "../../_lib/http.js";

export const onRequest = route({
    async PUT({ env, data }) {
        const slugs = data.body && data.body.slugs;
        if (!Array.isArray(slugs) || !slugs.every(s => typeof s === "string")) {
            return error(400, "slugs must be a list of topic slugs");
        }

        const { results } = await env.DB.prepare("SELECT slug FROM topics").all();
        const existing = new Set(results.map(row => row.slug));
        const given = new Set(slugs);

        const isPermutation =
            slugs.length === existing.size &&
            given.size === slugs.length &&
            slugs.every(s => existing.has(s));

        if (!isPermutation) {
            const details = [];
            const missing = [...existing].filter(s => !given.has(s));
            const unknown = [...given].filter(s => !existing.has(s));
            if (missing.length) details.push(`Missing: ${missing.join(", ")}`);
            if (unknown.length) details.push(`Unknown: ${unknown.join(", ")}`);
            if (given.size !== slugs.length) details.push("Some slugs are listed twice.");
            return error(400, "Order must list every topic exactly once", details);
        }

        if (slugs.length > 0) {
            const statement = env.DB.prepare("UPDATE topics SET position = ?1 WHERE slug = ?2");
            await env.DB.batch(slugs.map((slug, index) => statement.bind(index, slug)));
        }
        return json({ ok: true });
    }
});
