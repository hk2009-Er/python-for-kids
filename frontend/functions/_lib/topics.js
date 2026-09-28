// D1 access for topics. Prepared statements only.
import { validateTopic, findDuplicateExerciseIds } from "../../src/shared/validateTopic.js";

export async function listTopicRows(db) {
    const { results } = await db
        .prepare("SELECT slug, data FROM topics ORDER BY position, slug")
        .all();
    return results;
}

export async function listTopics(db) {
    return (await listTopicRows(db)).map(row => JSON.parse(row.data));
}

// Validates `input` and checks it against every other stored topic.
// Returns { ok, status, error, details, topic }.
export async function checkTopic(db, input, { ignoreSlug } = {}) {
    const result = validateTopic(input);
    if (!result.ok) {
        return { ok: false, status: 400, error: "Invalid topic", details: result.errors };
    }

    const topic = result.topic;
    const others = (await listTopics(db)).filter(t => t.slug !== (ignoreSlug ?? topic.slug));
    const details = [];

    for (const dup of findDuplicateExerciseIds([...others, topic])) {
        if (dup.topics.includes(topic.slug)) {
            const other = dup.topics.find(slug => slug !== topic.slug);
            details.push(`Exercise id ${dup.id} is already used by topic "${other}".`);
        }
    }

    const sameId = others.find(t => t.id === topic.id);
    if (sameId) {
        details.push(`Topic id ${topic.id} is already used by topic "${sameId.slug}".`);
    }

    if (details.length > 0) {
        return { ok: false, status: 400, error: "Invalid topic", details };
    }
    return { ok: true, topic };
}
