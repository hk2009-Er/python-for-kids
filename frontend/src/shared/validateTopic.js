// Shared by the admin panel (browser) and the API (Cloudflare Pages
// Functions), so both sides agree on what a valid topic looks like.
// Keep this file free of browser-only or React imports.

export const LEVELS = ["Beginner", "Intermediate", "Advanced"];
export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const LIMITS = {
    title: 120,
    icon: 16,
    description: 600,
    explanation: 4000,
    code: 6000,
    question: 600,
    option: 300,
    maxLessons: 50,
    maxExercises: 50,
    maxQuiz: 50
};

function isText(value, max, { allowEmpty = false } = {}) {
    return (
        typeof value === "string" &&
        value.length <= max &&
        (allowEmpty || value.trim().length > 0)
    );
}

function isPositiveInt(value) {
    return Number.isInteger(value) && value > 0;
}

function checkUniqueIds(items, label, errors) {
    const seen = new Set();

    items.forEach((item, index) => {
        if (item && seen.has(item.id)) {
            errors.push(`${label} ${index + 1}: id ${item.id} is used twice.`);
        }
        if (item) {
            seen.add(item.id);
        }
    });
}

function validateLesson(lesson, n, errors) {
    const where = `Lesson ${n}`;

    if (!lesson || typeof lesson !== "object") {
        errors.push(`${where} is missing.`);
        return;
    }
    if (!isPositiveInt(lesson.id)) errors.push(`${where}: id must be a positive whole number.`);
    if (!isText(lesson.title, LIMITS.title)) errors.push(`${where}: title is required.`);
    if (!isText(lesson.icon, LIMITS.icon, { allowEmpty: true })) errors.push(`${where}: icon is too long.`);
    if (!isText(lesson.explanation, LIMITS.explanation)) errors.push(`${where}: explanation is required.`);
    if (!isText(lesson.example, LIMITS.code)) errors.push(`${where}: example code is required.`);
    if (!isText(lesson.output, LIMITS.code, { allowEmpty: true })) errors.push(`${where}: output must be text.`);
    if (!Number.isInteger(lesson.points) || lesson.points < 0) errors.push(`${where}: points must be 0 or more.`);
}

function validateExercise(exercise, n, errors) {
    const where = `Exercise ${n}`;

    if (!exercise || typeof exercise !== "object") {
        errors.push(`${where} is missing.`);
        return;
    }
    if (!isPositiveInt(exercise.id)) errors.push(`${where}: id must be a positive whole number.`);
    if (!isText(exercise.title, LIMITS.title)) errors.push(`${where}: title is required.`);
    if (!DIFFICULTIES.includes(exercise.difficulty)) errors.push(`${where}: difficulty must be ${DIFFICULTIES.join(", ")}.`);
    if (!isText(exercise.description, LIMITS.description)) errors.push(`${where}: description is required.`);
    if (!isText(exercise.hint, LIMITS.description, { allowEmpty: true })) errors.push(`${where}: hint must be text.`);
    if (!isText(exercise.answer, LIMITS.code)) errors.push(`${where}: answer code is required.`);
    if (!Number.isInteger(exercise.points) || exercise.points < 0) errors.push(`${where}: points must be 0 or more.`);

    for (const flag of ["flexible", "usesInput", "turtle"]) {
        if (flag in exercise && typeof exercise[flag] !== "boolean") {
            errors.push(`${where}: ${flag} must be true or false.`);
        }
    }
}

function validateQuestion(question, n, errors) {
    const where = `Quiz question ${n}`;

    if (!question || typeof question !== "object") {
        errors.push(`${where} is missing.`);
        return;
    }
    if (!isPositiveInt(question.id)) errors.push(`${where}: id must be a positive whole number.`);
    if (!isText(question.question, LIMITS.question)) errors.push(`${where}: question text is required.`);

    if (
        !Array.isArray(question.options) ||
        question.options.length < 2 ||
        question.options.length > 6 ||
        !question.options.every(option => isText(option, LIMITS.option))
    ) {
        errors.push(`${where}: needs 2 to 6 non-empty options.`);
    } else if (
        !Number.isInteger(question.answer) ||
        question.answer < 0 ||
        question.answer >= question.options.length
    ) {
        errors.push(`${where}: pick which option is correct.`);
    }

    if (!isText(question.explanation, LIMITS.description, { allowEmpty: true })) {
        errors.push(`${where}: explanation must be text.`);
    }
}

// Returns { ok, errors, topic }. `topic` is a cleaned copy holding
// only known fields, so stray properties never reach the database.
export function validateTopic(input) {
    const errors = [];

    if (!input || typeof input !== "object" || Array.isArray(input)) {
        return { ok: false, errors: ["Topic must be an object."], topic: null };
    }

    if (!isPositiveInt(input.id)) errors.push("Topic id must be a positive whole number.");
    if (typeof input.slug !== "string" || !SLUG_PATTERN.test(input.slug) || input.slug.length > 60) {
        errors.push("Slug must be lowercase letters, numbers and dashes (e.g. my-topic).");
    }
    if (!isText(input.title, LIMITS.title)) errors.push("Topic title is required.");
    if (!isText(input.icon, LIMITS.icon)) errors.push("Topic icon is required.");
    if (!LEVELS.includes(input.level)) errors.push(`Level must be ${LEVELS.join(", ")}.`);
    if (!isText(input.description, LIMITS.description)) errors.push("Topic description is required.");

    const lessons = Array.isArray(input.lessons) ? input.lessons : null;
    const exercises = Array.isArray(input.exercises) ? input.exercises : null;
    const quiz = Array.isArray(input.quiz) ? input.quiz : null;

    if (!lessons || lessons.length === 0) errors.push("Add at least one lesson.");
    if (!exercises) errors.push("Exercises must be a list.");
    if (!quiz) errors.push("Quiz must be a list.");

    if (lessons && lessons.length > LIMITS.maxLessons) errors.push(`At most ${LIMITS.maxLessons} lessons.`);
    if (exercises && exercises.length > LIMITS.maxExercises) errors.push(`At most ${LIMITS.maxExercises} exercises.`);
    if (quiz && quiz.length > LIMITS.maxQuiz) errors.push(`At most ${LIMITS.maxQuiz} quiz questions.`);

    (lessons || []).forEach((lesson, i) => validateLesson(lesson, i + 1, errors));
    (exercises || []).forEach((exercise, i) => validateExercise(exercise, i + 1, errors));
    (quiz || []).forEach((question, i) => validateQuestion(question, i + 1, errors));

    if (lessons) checkUniqueIds(lessons, "Lesson", errors);
    if (exercises) checkUniqueIds(exercises, "Exercise", errors);
    if (quiz) checkUniqueIds(quiz, "Quiz question", errors);

    if (errors.length > 0) {
        return { ok: false, errors, topic: null };
    }

    const pickFlags = (exercise) => {
        const flags = {};
        for (const flag of ["flexible", "usesInput", "turtle"]) {
            if (exercise[flag] === true) flags[flag] = true;
        }
        return flags;
    };

    const topic = {
        id: input.id,
        slug: input.slug,
        title: input.title.trim(),
        icon: input.icon.trim(),
        level: input.level,
        description: input.description.trim(),
        lessons: lessons.map(({ id, title, icon, explanation, example, output, points }) => ({
            id, title: title.trim(), icon: (icon || "").trim(), explanation, example, output, points
        })),
        exercises: exercises.map(exercise => ({
            id: exercise.id,
            title: exercise.title.trim(),
            difficulty: exercise.difficulty,
            description: exercise.description,
            hint: exercise.hint || "",
            answer: exercise.answer,
            points: exercise.points,
            ...pickFlags(exercise)
        })),
        quiz: quiz.map(({ id, question, options, answer, explanation }) => ({
            id, question, options: [...options], answer, explanation: explanation || ""
        }))
    };

    return { ok: true, errors: [], topic };
}

// Exercise ids are used in URLs (/exercise/:id), so they must be
// unique across every topic, not just inside one.
export function findDuplicateExerciseIds(topics) {
    const seen = new Map();
    const duplicates = [];

    for (const topic of topics) {
        for (const exercise of topic.exercises || []) {
            if (seen.has(exercise.id) && seen.get(exercise.id) !== topic.slug) {
                duplicates.push({ id: exercise.id, topics: [seen.get(exercise.id), topic.slug] });
            }
            seen.set(exercise.id, topic.slug);
        }
    }

    return duplicates;
}
