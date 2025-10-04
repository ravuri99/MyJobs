# Murali Portfolio (Jobs)

Personal portfolio with job tracker, powered by a Google Sheet.

## 1) Get your CSV link
- Open your Google Sheet → **File → Share → Publish to web** → choose your *Jobs* tab → **CSV** → publish.
- Or use this pattern directly:
```
https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<TAB_GID>
```
For your sheet ID: `124NGGd7EaNyRqZTkajy8wb49lbKKND4GkdfDBk3PeM0`

Often the first tab is `gid=0`. If not, click the tab and copy the `gid` from the URL.

## 2) Configure env
Create `.env.local`:
```
JOBS_CSV_URL=https://docs.google.com/spreadsheets/d/124NGGd7EaNyRqZTkajy8wb49lbKKND4GkdfDBk3PeM0/export?format=csv&gid=0
NEXT_PUBLIC_JOBS_CSV_URL=https://docs.google.com/spreadsheets/d/124NGGd7EaNyRqZTkajy8wb49lbKKND4GkdfDBk3PeM0/export?format=csv&gid=0
```

## 3) Install & run
```
npm i
npm run dev
```
Open http://localhost:3000/murali and http://localhost:3000/admin

## 4) Deploy to Vercel
- Push to GitHub, import into Vercel
- Add **Environment Variables** in Vercel project settings:
  - `JOBS_CSV_URL` and `NEXT_PUBLIC_JOBS_CSV_URL` with the same CSV url

## Notes
- Columns expected (case-insensitive): `Date | Job Board | Status | HyperLink | CompanyName | Role | JD`
- JD is shown in a collapsible section on each card.
