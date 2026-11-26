# Four Pizza Menu Management

A React single-page application for the Modern Frameworks for Software Development assessment. Staff can view, search, add, edit and delete sample pizza menu records.

## Run in GitHub Codespaces

1. Select **Code → Codespaces → Create codespace on main**.
2. In the terminal, run:

```bash
npm ci
npm run dev
```

3. Open forwarded port **5173** in the Ports tab. Keep development ports private unless you intend to share them.

Requires Node.js 20.19+ or 22.12+ (Node 24 supported).

## Build

```bash
npm run build
npm run preview
```

For hosts that restrict network interface discovery, use `npx vite --host 127.0.0.1` locally. Production hosts must rewrite frontend routes to `index.html` for direct navigation and refreshes.

## Features

- Dashboard showing record count, sizes represented and average price.
- Menu search and size filtering.
- Add and edit forms with required-name and positive-price validation.
- Reusable PizzaCard and PizzaForm components.
- Delete confirmation and cancellation.
- Initial JSON retrieval using Axios inside useEffect, with loading, error and retry states.
- Shared parent-owned array, immutable CRUD operations, and four Wouter routes.
- Responsive Bootstrap CSS and custom CSS; no Bootstrap JavaScript or extra UI libraries.

## Assessment evidence

See [the LO demonstration guide](docs/LO-DEMONSTRATION.md). Source comments mark the relevant LO sections.

## Data and limitations

`public/json/pizzas.json` contains fictional sample records and prices, not a verified live Four Pizza menu. Changes are kept in React memory across client-side navigation and reset after a refresh. CRUD does not write to the JSON file. No backend, login, payment processing or database is included.

## Dependencies

Runtime: React, React DOM, Axios, Wouter and vanilla Bootstrap CSS. Vite and its React plugin are build tools. Jotai is permitted by the assessment but unnecessary here: shared state is lifted to App, following Lesson 9.

## Submission

Submit this repository URL and a ZIP of the source and required assets through LMS. Exclude node_modules, dist, credentials and .env files. The final academic report should include screenshots and verified test results from the completed app.

## Visual design

The dark-green sidebar, terracotta actions, dashboard panels and size illustrations are adapted from the supplied FourPizza_Backend_Assignment_Submission.zip. The EJS interface is rebuilt as React components; this version still uses local JSON and parent-owned state, not the original backend.
