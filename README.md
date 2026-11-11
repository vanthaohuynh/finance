# Finance

Rails 8.1 API + React (esbuild) app for tracking clinical-study accounts, expenses and revenues.

## Requirements

- Ruby 3.3.11 (see `.ruby-version`)
- Node.js 20+ and npm (npm is the only package manager; `package-lock.json` is the lockfile)
- PostgreSQL

## Setup

```bash
npm install
bin/setup --skip-server   # bundle install, db:prepare (create DB + load schema), clear logs/tmp
bin/rails db:seed         # sample data + demo logins (safe to re-run)
bin/dev                   # Rails on :3000 plus the esbuild watcher (Procfile.dev)
```

## Demo logins

`bin/rails db:seed` creates one login per role (in every environment except production;
set `SEED_DEMO_USERS=1` to create them there too, e.g. on the demo site — never on a
deployment with real data, since these passwords are public):

| Role      | Email                   | Password           | Can do                                                        |
|-----------|-------------------------|--------------------|---------------------------------------------------------------|
| Regular   | `regular@example.com`   | `regular-demo-1`   | Data entry for expenses only                                  |
| PowerUser | `poweruser@example.com` | `poweruser-demo-1` | Create/edit accounts, amendments, expenses, revenues, categories |
| Admin     | `admin@example.com`     | `admin-demo-1`     | Everything, including managing users                          |

Roles are stored with the names the backend checks (`data_entry`, `power_user`, `admin`,
plus `viewer`, the default for new users) and with the ids the React app expects
(1 = Regular, 2 = PowerUser, 3 = Admin, 4 = Viewer).

## Tests and checks

```bash
bin/rails test   # request tests: login/JWT, HTML routes, every /api/v1 GET endpoint, CRUD per model, roles, seeds
bin/ci           # setup, zeitwerk check, JS build, bundler-audit, npm audit
```

GitHub Actions (`.github/workflows/ci.yml`) runs `db:prepare`, `bin/rails test` and `bin/ci`
against PostgreSQL 16 on every push and pull request.

## Deployment

- Needs `RAILS_MASTER_KEY` (JWTs are signed with the app's `secret_key_base` from credentials,
  or `SECRET_KEY_BASE` if that is set).
- `bin/rails assets:precompile` builds the JavaScript with `npm run build`.
- Run `bin/rails db:migrate` on deploy.
