/*
    Tiny progress helper backed by localStorage.

    Every storage access is wrapped in try/catch so the site keeps
    working in private windows or when storage is blocked/full.
*/

const KEY = "pfk-progress-v1";
const DRAFT_PREFIX = "pfk-draft-";

const EMPTY = {
    solvedExercises: [],
    completedTopics: [],
    quizScores: {},
    xp: 0
};


function load() {

    try {
        const raw = window.localStorage.getItem(KEY);

        if (!raw) {
            return { ...EMPTY, quizScores: {} };
        }

        const data = JSON.parse(raw) || {};

        return {
            solvedExercises: Array.isArray(data.solvedExercises)
                ? data.solvedExercises.map(String)
                : [],
            completedTopics: Array.isArray(data.completedTopics)
                ? data.completedTopics
                : [],
            quizScores:
                data.quizScores && typeof data.quizScores === "object"
                    ? data.quizScores
                    : {},
            xp: Number(data.xp) || 0
        };

    } catch {
        return { ...EMPTY, quizScores: {} };
    }
}


function save(data) {

    try {
        window.localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
        // Storage unavailable - progress just won't persist.
    }
}


/* ---------------- Exercises ---------------- */

export function getSolvedExercises() {
    return load().solvedExercises;
}

export function isExerciseSolved(id) {
    return load().solvedExercises.includes(String(id));
}

/* Returns true if this is the first time it was solved (XP awarded). */
export function markExerciseSolved(id, points = 0) {

    const data = load();
    const key = String(id);

    if (data.solvedExercises.includes(key)) {
        return false;
    }

    data.solvedExercises.push(key);
    data.xp += Number(points) || 0;
    save(data);

    return true;
}


/* ---------------- Lessons / topics ---------------- */

export function getCompletedTopics() {
    return load().completedTopics;
}

export function isTopicCompleted(slug) {
    return load().completedTopics.includes(slug);
}

/* Returns true if newly completed (XP awarded). */
export function markTopicCompleted(slug, points = 0) {

    const data = load();

    if (data.completedTopics.includes(slug)) {
        return false;
    }

    data.completedTopics.push(slug);
    data.xp += Number(points) || 0;
    save(data);

    return true;
}


/* ---------------- Quizzes ---------------- */

/* Returns { score, total } or null. */
export function getBestQuizScore(slug) {
    return load().quizScores[slug] || null;
}

export function getAllQuizScores() {
    return load().quizScores;
}

/* Saves only if it beats the previous best. Returns true if it's a new best. */
export function saveQuizScore(slug, score, total) {

    const data = load();
    const prev = data.quizScores[slug];

    const ratio = total ? score / total : 0;
    const prevRatio = prev && prev.total ? prev.score / prev.total : -1;

    if (prev && prevRatio >= ratio) {
        return false;
    }

    data.quizScores[slug] = { score, total };
    save(data);

    return true;
}


/* ---------------- XP ---------------- */

export function getTotalXP() {
    return load().xp;
}

export function addXP(amount) {

    const data = load();
    data.xp += Number(amount) || 0;
    save(data);

    return data.xp;
}


/* ---------------- Code drafts ---------------- */

export function getDraft(exerciseId) {

    try {
        return window.localStorage.getItem(DRAFT_PREFIX + exerciseId);
    } catch {
        return null;
    }
}

export function saveDraft(exerciseId, code) {

    try {
        window.localStorage.setItem(DRAFT_PREFIX + exerciseId, code);
    } catch {
        // ignore
    }
}

export function clearDraft(exerciseId) {

    try {
        window.localStorage.removeItem(DRAFT_PREFIX + exerciseId);
    } catch {
        // ignore
    }
}


/* ---------------- Reset ---------------- */

export function resetProgress() {

    try {
        window.localStorage.removeItem(KEY);
    } catch {
        // ignore
    }
}
