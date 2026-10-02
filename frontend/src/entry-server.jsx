/* oxlint-disable react/only-export-components -- build-only entry, not hot reloaded */
/*
    Build-time server entry, used only by scripts/prerender.mjs.
    Renders the app for one URL to static HTML. prerenderToNodeStream
    waits for React.lazy pages / Suspense to resolve, so the output
    contains the full page content.
*/

import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";

import App from "./App.jsx";

export {
    getPageMeta,
    getCanonicalUrl,
    getAllRoutes,
    SITE_URL
} from "./seo/pageMeta.js";


export async function render(url) {

    const { prelude } = await prerenderToNodeStream(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
    );

    const chunks = [];

    for await (const chunk of prelude) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    return Buffer.concat(chunks).toString("utf8");
}
