# Futbol Stats

A Next.js app to follow football: today's fixtures, a team statistics dashboard and player profiles with season stats. Data comes from the [API-Football](https://www.api-football.com/) (API-Sports) v3 API.

**Stack:** Next.js 16 (App Router, server components) · React 19 · TypeScript · Tailwind CSS 4

## Features

- **Home page** (`/`): today's fixtures (league, match status and score) and two entry cards, one to team statistics and one to player statistics.
- **Team dashboard** (`/dashboard`): choose one of 5 featured teams (Manchester United, Manchester City, Liverpool, Real Madrid, Barcelona) and see its 2023 season: recent form, matches played, wins, draws and losses, goals scored and conceded with averages, clean sheets, failed-to-score games, biggest wins and losses, penalties, cards and most used formation. The selected team is kept in the URL (`?team=<id>`). To add a team, add an entry to `featuredTeams` in `app/dashboard/page.tsx`.
- **Players** (`/players`): a list of 12 featured players, each with a profile page (`/players/[id]`) and season statistics for 2023 or 2024.
- **Spanish / English interface** on the home page and the dashboard, chosen with the `lang` query parameter (default: Spanish, and any value other than `en` falls back to Spanish). Translations live in `lib/translations.ts`. The player pages are in English only.
- **Server-side caching** with Next.js `revalidate`: fixtures 5 minutes, team and player statistics 1 hour, player profiles 24 hours. This keeps the number of API calls low.

## Getting started

You need Node.js 20 or newer and a free API-Football key (create an account at [api-football.com](https://www.api-football.com/)).

```bash
git clone https://github.com/horaciodemaria-dev/futbol-stats.git
cd futbol-stats
npm install
```

Create a `.env.local` file in the project root with your key:

```bash
API_FOOTBALL_KEY=your_api_key_here
```

Then start the development server and open <http://localhost:3000>:

```bash
npm run dev
```

The key is only read on the server (`lib/api.ts`) and is never sent to the browser. `.env*` files are git-ignored.

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run build` | Production build. |
| `npm start` | Runs the production build. |
| `npm run lint` | Runs ESLint. |

## Project structure

```
app/
  page.tsx            Home: today's fixtures and entry cards
  dashboard/          Team statistics dashboard with team selector
  players/            Featured players list
  players/[id]/       Player profile and season statistics
components/
  LanguageSelector.tsx   ES / EN switch
lib/
  api.ts              API-Football requests (fixtures, team, player)
  translations.ts     ES / EN strings
```

## Deploying

The app can be deployed to [Vercel](https://vercel.com/). Add `API_FOOTBALL_KEY` as an environment variable in the project settings before deploying.

## Limitations

- The free API-Football plan has a daily request limit and only gives access to some seasons, which is why player statistics are restricted to 2023 and 2024.
- The dashboard offers 5 teams and the 2023 season only.
- No automated tests yet.
