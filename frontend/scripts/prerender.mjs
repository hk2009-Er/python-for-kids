/*
    Build-time prerender (runs after `vite build` and the SSR build).

    For every route it renders the React app to HTML with
    src/entry-server.jsx and writes a static file Cloudflare Pages serves
    at the clean URL:

        /                -> dist/index.html
        /learn           -> dist/learn.html
        /lesson/strings  -> dist/lesson/strings.html
        (unknown URLs)   -> dist/404.html  (real 404 status)

    It also writes dist/sitemap.xml from the same route list.
    Plain Node - no browser needed, so it runs on Cloudflare's build image.
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");
const manifestPath = path.join(distDir, ".vite", "manifest.json");

const {
    render,
    getPageMeta,
    getCanonicalUrl,
    getAllRoutes,
    SITE_URL
} = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
    : {};


/* Which lazy page module renders a route (keys of the Vite manifest). */
const PAGE_MODULES = {
    learn: "src/pages/Learn.jsx",
    lesson: "src/pages/Lesson.jsx",
    exercises: "src/pages/Exercises.jsx",
    exercise: "src/pages/Exercise.jsx",
    projects: "src/pages/Projects.jsx",
    project: "src/pages/ProjectGuide.jsx",
    quizzes: "src/pages/Quizzes.jsx",
    quiz: "src/pages/Quiz.jsx",
    games: "src/pages/Games.jsx",
    game: "src/pages/Game.jsx",
    about: "src/pages/About.jsx",
    contact: "src/pages/Contact.jsx",
    privacy: "src/pages/PrivacyPolicy.jsx",
    terms: "src/pages/Terms.jsx",
    "404": "src/pages/NotFound.jsx"
};


/*
    CSS + JS of the route's lazy page chunk. Linking the CSS avoids a flash
    of unstyled prerendered content; modulepreload speeds up hydration.
    Vite's preload helper skips CSS that is already linked.
*/
function pageAssets(section) {

    const css = new Set();
    const js = new Set();
    const seen = new Set();

    const visit = (key, isEntry) => {

        const chunk = manifest[key];

        if (!chunk || seen.has(key) || (chunk.isEntry && !isEntry)) {
            return;
        }

        seen.add(key);
        js.add(chunk.file);
        (chunk.css || []).forEach(file => css.add(file));
        (chunk.imports || []).forEach(k => visit(k, false));
    };

    const moduleKey = PAGE_MODULES[section];

    if (moduleKey) {
        visit(moduleKey, true);
    }

    // Skip anything index.html already links (entry chunk, shared runtime).
    const isNew = file => !template.includes(`/${file}"`);

    return [
        ...[...css].filter(isNew).map(f => `<link rel="stylesheet" crossorigin href="/${f}">`),
        ...[...js].filter(isNew).map(f => `<link rel="modulepreload" crossorigin href="/${f}">`)
    ].join("\n    ");
}


function escapeHtml(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}


function replaceOnce(html, pattern, replacement, label) {

    if (!pattern.test(html)) {
        throw new Error(`prerender: index.html is missing ${label}`);
    }

    return html.replace(pattern, () => replacement);
}


function buildPage(appHtml, { title, description, url, section, noindex }) {

    const t = escapeHtml(title);
    const d = escapeHtml(description);

    let html = template;

    html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, "<title>");
    html = replaceOnce(html, /<meta name="description" content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${d}" />`, "meta description");
    html = replaceOnce(html, /<meta property="og:title" content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="${t}" />`, "og:title");
    html = replaceOnce(html, /<meta property="og:description" content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="${d}" />`, "og:description");

    if (url) {
        html = replaceOnce(html, /<link rel="canonical" href="[^"]*"\s*\/?>/,
            `<link rel="canonical" href="${escapeHtml(url)}" />`, "canonical");
        html = replaceOnce(html, /<meta property="og:url" content="[^"]*"\s*\/?>/,
            `<meta property="og:url" content="${escapeHtml(url)}" />`, "og:url");
    } else {
        html = html
            .replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/, "")
            .replace(/\s*<meta property="og:url" content="[^"]*"\s*\/?>/, "");
    }

    const extraHead = [
        noindex ? `<meta name="robots" content="noindex" />` : "",
        pageAssets(section)
    ].filter(Boolean).join("\n    ");

    if (extraHead) {
        html = replaceOnce(html, /<\/head>/, `  ${extraHead}\n  </head>`, "</head>");
    }

    return replaceOnce(html, /<div id="root"><\/div>/,
        `<div id="root">${appHtml}</div>`, '<div id="root"></div>');
}


function outputFile(route) {

    if (route === "/") {
        return path.join(distDir, "index.html");
    }

    return path.join(distDir, ...route.slice(1).split("/")) + ".html";
}


async function renderRoute(route, outFile, options = {}) {

    const appHtml = await render(route);
    const meta = getPageMeta(route);

    if (!options.notFound && meta.notFound) {
        throw new Error(`prerender: no page meta for ${route}`);
    }

    const html = buildPage(appHtml, {
        title: meta.title,
        description: meta.description,
        url: options.notFound ? null : getCanonicalUrl(route),
        section: options.notFound ? "404" : route.split("/")[1],
        noindex: options.notFound
    });

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);

    return Buffer.byteLength(html);
}


const routes = [...new Set(getAllRoutes())];
let totalBytes = 0;

for (const route of routes) {
    totalBytes += await renderRoute(route, outputFile(route));
}

// Unknown URLs: Pages serves this with a 404 status (and disables the SPA
// fallback, which is why every real route above must be prerendered).
totalBytes += await renderRoute("/__not-found__", path.join(distDir, "404.html"), {
    notFound: true
});


const today = new Date().toISOString().slice(0, 10);

const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(route => [
        "  <url>",
        `    <loc>${escapeHtml(SITE_URL + (route === "/" ? "/" : route))}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        "  </url>"
    ].join("\n")),
    "</urlset>",
    ""
].join("\n");

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);

// The manifest was only needed above - don't deploy it.
fs.rmSync(path.join(distDir, ".vite"), { recursive: true, force: true });

console.log(
    `prerender: wrote ${routes.length} pages + 404.html ` +
    `(${(totalBytes / 1024).toFixed(0)} KiB) and sitemap.xml`
);
