import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/*
    Keeps <title>, description, canonical and Open Graph tags in sync on
    client-side navigation. The prerendered HTML already has the right
    tags for the first page, so the first run is skipped. pageMeta is
    loaded on demand so the lesson data stays out of the main bundle.
*/

function setMeta(selector, attr, value) {

    const el = document.head.querySelector(selector);

    if (el) {
        el.setAttribute(attr, value);
    }
}

function MetaUpdater() {

    const { pathname } = useLocation();
    const first = useRef(true);

    useEffect(() => {

        if (first.current) {
            first.current = false;

            // In `vite dev` there is no prerendered head, so fill it in.
            if (!import.meta.env.DEV) {
                return;
            }
        }

        let cancelled = false;

        import("./pageMeta.js").then(({ getPageMeta, getCanonicalUrl }) => {

            if (cancelled) {
                return;
            }

            const { title, description } = getPageMeta(pathname);
            const url = getCanonicalUrl(pathname);

            document.title = title;
            setMeta('meta[name="description"]', "content", description);
            setMeta('meta[property="og:title"]', "content", title);
            setMeta('meta[property="og:description"]', "content", description);
            setMeta('meta[property="og:url"]', "content", url);
            setMeta('link[rel="canonical"]', "href", url);
        });

        return () => {
            cancelled = true;
        };

    }, [pathname]);

    return null;
}

export default MetaUpdater;
