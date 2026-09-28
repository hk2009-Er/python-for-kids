// Unknown /api/* paths get a JSON 404 instead of the SPA's index.html.
import { error } from "../_lib/http.js";

export const onRequest = () => error(404, "Not found");
