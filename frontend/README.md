# Python for Kids

React + Vite site with lessons, exercises (real Python in the browser via
Pyodide), quizzes and games. Content is edited in the admin panel at
`/admin` and stored in a Cloudflare D1 database. If the API is unreachable,
the site falls back to the content bundled in `src/data/`.

## Project layout

| Path | What it is |
|---|---|
| `src/` | The React site. Admin panel: `src/pages/Admin.jsx` + `src/admin/` |
| `src/data/lessonData.js`, `src/data/topics/` | Bundled content (fallback + seed data) |
| `src/shared/validateTopic.js` | Topic rules, used by both the admin panel and the API |
| `functions/` | Cloudflare Pages Functions: `/api/content` and `/api/admin/*` |
| `migrations/` | D1 schema (`0001`) and seed content (`0002`, generated) |
| `scripts/build-seed.mjs` | Regenerates `0002_seed_content.sql` from `src/data/` |

## Run locally

Needs Node.js. On Windows, also install the
[Visual C++ Redistributable (x64)](https://aka.ms/vs/17/release/vc_redist.x64.exe),
or `wrangler` can't start its local runtime.

```sh
npm install
cp .dev.vars.example .dev.vars   # then set ADMIN_PASSWORD and SESSION_SECRET
npm run build
npm run db:migrate:local         # creates the local database with all topics
npm run api                      # API + built site on http://localhost:8788
npm run dev                      # in a second terminal: http://localhost:5173
```

Open http://localhost:5173/admin and log in with the `ADMIN_PASSWORD` from
`.dev.vars`. `npm run dev` forwards `/api` to the API on port 8788, so the
admin panel only works while `npm run api` is running.

## Deploy (Cloudflare Pages)

One-time setup:

1. `npx wrangler login`
2. `npx wrangler d1 create python-for-kids`, then paste the printed
   `database_id` into `wrangler.toml` (replacing the zeros).
3. `npm run db:migrate:remote` to create the tables and load the topics.
4. Set two secrets on the Pages project, for both Production and Preview:
   ```sh
   npx wrangler pages secret put ADMIN_PASSWORD --project-name python-tutorial-for-kids
   npx wrangler pages secret put SESSION_SECRET --project-name python-tutorial-for-kids
   ```
   Use a long password. For `SESSION_SECRET` use 32+ random bytes, e.g.
   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
5. In the Pages project settings, the root directory must be `frontend`
   (build command `npm run build`, output `dist`) so `functions/` is deployed.
   If the project isn't named `python-tutorial-for-kids`, change `name` in
   `wrangler.toml` and the commands above.

Then push or redeploy as usual.

## Admin security notes

- Login is rate-limited to 5 failures per IP per 15 minutes.
- Sessions last 12 hours. Logging out clears the cookie. To sign out every
  session at once (e.g. if the password leaked), change `SESSION_SECRET`.
- Without both secrets set, admin login is disabled.

## Changing the bundled content

Once the database is set up, it is the source of truth: make content changes
in the admin panel. `src/data/` is only the offline fallback and the initial
seed. The seed is a migration, so it runs once per database. Regenerating it
with `npm run seed:build` only affects databases that haven't been set up yet.
