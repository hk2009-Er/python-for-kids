/* Id, slug and list helpers for the admin editor. */

function maxId(items) {
    return (items || []).reduce(
        (max, item) => (Number.isInteger(item && item.id) && item.id > max ? item.id : max),
        0
    );
}

/* New topic id = biggest existing topic id + 1. */
export function nextTopicId(topics) {
    return maxId(topics) + 1;
}

/*
    Lesson ids follow the "topic 3 -> 301, 302..." pattern when a
    topic has none yet; otherwise max within the topic + 1.
*/
export function nextLessonId(topic) {
    const max = maxId(topic.lessons);
    return max > 0 ? max + 1 : topic.id * 100 + 1;
}

export function nextQuizId(topic) {
    return maxId(topic.quiz) + 1;
}

/*
    Exercise ids appear in URLs (/exercise/:id), so they must be
    unique across ALL topics. `otherTopics` are the saved topics
    except the one being edited (its exercises come from `topic`).
*/
export function nextExerciseId(topic, otherTopics) {
    let max = maxId(topic.exercises);

    for (const other of otherTopics || []) {
        max = Math.max(max, maxId(other.exercises));
    }

    return max + 1;
}

export function slugify(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60)
        .replace(/-+$/g, "");
}

export function moveItem(list, index, delta) {
    const target = index + delta;

    if (target < 0 || target >= list.length) {
        return list;
    }

    const copy = [...list];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    return copy;
}

export function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

export function emptyTopic(id) {
    return {
        id,
        slug: "",
        title: "",
        icon: "📘",
        level: "Beginner",
        description: "",
        lessons: [],
        exercises: [],
        quiz: []
    };
}

export function emptyLesson(id) {
    return { id, title: "", icon: "📘", explanation: "", example: "", output: "", points: 10 };
}

export function emptyExercise(id) {
    return { id, title: "", difficulty: "Easy", description: "", hint: "", answer: "", points: 10 };
}

export function emptyQuestion(id) {
    return { id, question: "", options: ["", ""], answer: 0, explanation: "" };
}

export function usesInput(code) {
    return /\binput\s*\(/.test(code || "");
}
