import lessonData from "./lessonData";

// Content edited in the admin panel is served by /api/content.
// Every page imports `lessonData` directly, so we refresh that same
// array in place before the app renders. If the API is unreachable
// (offline, plain `vite` dev server, outage) the bundled topics stay.
export async function loadContent({ timeoutMs = 3500 } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch("/api/content", {
            signal: controller.signal,
            headers: { Accept: "application/json" }
        });

        if (!response.ok) {
            return "bundled";
        }

        const data = await response.json();

        if (!Array.isArray(data.topics) || data.topics.length === 0) {
            return "bundled";
        }

        lessonData.splice(0, lessonData.length, ...data.topics);
        return "remote";
    } catch {
        return "bundled";
    } finally {
        clearTimeout(timer);
    }
}
