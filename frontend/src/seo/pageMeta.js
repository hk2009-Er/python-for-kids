/*
    Per-page SEO data shared by the build-time prerender
    (scripts/prerender.mjs via src/entry-server.jsx) and the
    client-side title updater (src/seo/MetaUpdater.jsx).
*/

import lessonData from "../data/lessonData";

export const SITE_URL = "https://python-tutorial-for-kids.pages.dev";
export const SITE_NAME = "Python for Kids";

const SUFFIX = "Python for Kids | Free Python Lessons for Children";

export const DEFAULT_META = {
    title: `${SITE_NAME} | Free Python Lessons for Children`,
    description:
        "Free, kid-friendly Python lessons with examples you can run in the browser, coding exercises, quizzes and games. Learn Python step by step from the basics to classes."
};

/* The 5 games shown on /games (ids match src/pages/Games.jsx). */
export const GAMES = [
    {
        id: "python-snake",
        title: "Python Snake",
        description: "Answer Python questions correctly and help your snake grow! A free Python quiz game for kids."
    },
    {
        id: "code-puzzle",
        title: "Code Puzzle",
        description: "Arrange Python code blocks in the correct order and build working programs. A free Python puzzle game for kids."
    },
    {
        id: "python-catch",
        title: "Python Catch",
        description: "Catch the correct Python answer before the timer runs out! A free Python learning game for kids."
    },
    {
        id: "space-python",
        title: "Space Python",
        description: "Answer Python questions to launch your rocket through space. A free Python learning game for kids."
    },
    {
        id: "code-runner",
        title: "Code Runner",
        description: "Run through Python coding challenges and collect points along the way. A free Python learning game for kids."
    }
];

/*
    Projects are optional: src/data/projectData.js may not exist yet.
    import.meta.glob returns {} when the file is missing.
*/
const projectModules = import.meta.glob("../data/projectData.js", { eager: true });

export function getProjects() {

    const mod = Object.values(projectModules)[0];
    const list = mod && mod.default;

    return Array.isArray(list)
        ? list.filter(p => p && p.slug)
        : [];
}


export function getAllExercises() {

    const all = [];

    lessonData.forEach(topic => {
        (topic.exercises || []).forEach(exercise => {
            all.push({ ...exercise, topic });
        });
    });

    return all;
}


const STATIC_PAGES = {
    "/": DEFAULT_META,
    "/learn": {
        title: `Learn Python - ${SUFFIX}`,
        description:
            "Step-by-step Python lessons for kids, from Python basics, variables and loops to lists, functions, dictionaries and classes. Every lesson has a clear explanation and an example to try."
    },
    "/exercises": {
        title: `Python Exercises - ${SUFFIX}`,
        description:
            "Practice Python with fun coding exercises for kids. Write real Python code in the browser, check your answer and earn XP, from easy to hard challenges."
    },
    "/projects": {
        title: `Python Projects - ${SUFFIX}`,
        description:
            "Fun Python projects for kids with step-by-step guides. Build games, quizzes and tools to put your Python skills into practice."
    },
    "/quizzes": {
        title: `Python Quizzes - ${SUFFIX}`,
        description:
            "Test what you have learned with free Python quizzes for kids. One quiz for every topic, from Python basics to classes and objects."
    },
    "/games": {
        title: `Python Games - ${SUFFIX}`,
        description:
            "Learn Python by playing: Python Snake, Code Puzzle, Python Catch, Space Python and Code Runner. Free coding games for kids."
    },
    "/about": {
        title: `About Us - ${SUFFIX}`,
        description:
            "Python for Kids is a free website that helps children learn Python programming with simple lessons, exercises, quizzes and games."
    },
    "/contact": {
        title: `Contact Us - ${SUFFIX}`,
        description:
            "Get in touch with the Python for Kids team with questions, feedback or ideas for new lessons."
    },
    "/privacy": {
        title: `Privacy Policy - ${SUFFIX}`,
        description:
            "Read the Python for Kids privacy policy: what information we collect, how cookies and advertising are used, and how we protect children's privacy."
    },
    "/terms": {
        title: `Terms & Conditions - ${SUFFIX}`,
        description:
            "The terms and conditions for using the Python for Kids website, lessons, exercises, quizzes and games."
    }
};

export const NOT_FOUND_META = {
    title: `Page Not Found - ${SITE_NAME}`,
    description: "Sorry, we could not find that page. Explore free Python lessons, exercises, quizzes and games for kids."
};


function clip(text, max = 160) {

    const clean = String(text || "").replace(/\s+/g, " ").trim();

    if (clean.length <= max) {
        return clean;
    }

    return clean.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}


function normalizePath(pathname) {

    let path = String(pathname || "/").split(/[?#]/)[0];

    if (path.length > 1) {
        path = path.replace(/\/+$/, "");
    }

    return path || "/";
}


/* Returns { title, description, notFound } for a URL path. */
export function getPageMeta(pathname) {

    const path = normalizePath(pathname);

    if (STATIC_PAGES[path]) {
        return { ...STATIC_PAGES[path], notFound: false };
    }

    const [, section, param] = path.split("/");
    const findTopic = slug => lessonData.find(t => t.slug === slug);

    if (section === "lesson") {
        const topic = findTopic(param);
        if (topic) {
            return {
                title: `${topic.title} - ${SUFFIX}`,
                description: clip(topic.description),
                notFound: false
            };
        }
    }

    if (section === "quiz") {
        const topic = findTopic(param);
        if (topic) {
            return {
                title: `${topic.title} Quiz - ${SUFFIX}`,
                description: clip(
                    `Take the ${topic.title} quiz: ${(topic.quiz || []).length} questions to test your Python skills. ${topic.description}`
                ),
                notFound: false
            };
        }
    }

    if (section === "exercise") {
        const exercise = getAllExercises().find(e => String(e.id) === param);
        if (exercise) {
            return {
                title: `${exercise.title} - ${exercise.topic.title} Exercise - ${SUFFIX}`,
                description: clip(
                    `${exercise.difficulty || "Easy"} Python exercise: ${exercise.description} Write and run your code in the browser.`
                ),
                notFound: false
            };
        }
    }

    if (section === "game") {
        const game = GAMES.find(g => g.id === param);
        if (game) {
            return {
                title: `${game.title} - ${SUFFIX}`,
                description: clip(game.description),
                notFound: false
            };
        }
    }

    if (section === "project") {
        const project = getProjects().find(p => p.slug === param);
        if (project) {
            return {
                title: `${project.title} - Python Project - ${SUFFIX}`,
                description: clip(project.description || DEFAULT_META.description),
                notFound: false
            };
        }
    }

    return { ...NOT_FOUND_META, notFound: true };
}


export function getCanonicalUrl(pathname) {

    const path = normalizePath(pathname);

    return SITE_URL + (path === "/" ? "/" : path);
}


/* Every real route, used for prerendering and the sitemap. */
export function getAllRoutes() {

    return [
        ...Object.keys(STATIC_PAGES),
        ...lessonData.map(t => `/lesson/${t.slug}`),
        ...lessonData
            .filter(t => (t.quiz || []).length > 0)
            .map(t => `/quiz/${t.slug}`),
        ...getAllExercises().map(e => `/exercise/${e.id}`),
        ...GAMES.map(g => `/game/${g.id}`),
        ...getProjects().map(p => `/project/${p.slug}`)
    ];
}
