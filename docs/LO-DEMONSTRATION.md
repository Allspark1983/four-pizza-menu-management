# Learning objectives: code evidence and demonstration

## LO1 — React reactivity and setup

Open `index.html`, `src/main.jsx`, and `src/App.jsx` in order. Explain that index.html supplies the root, main.jsx mounts App, and components return JSX. State updates schedule rendering, and React reconciles the output with the DOM.

Project creation equivalent:

```bash
npm create vite@latest four-pizza-menu-management -- --template react
cd four-pizza-menu-management
npm install axios wouter bootstrap
npm run dev
```

The supplied project is already created; use `npm ci` instead of creating a second project.

Demonstrate: type in the menu search box and show the rendered list responding.

## LO2 — Hooks, interactivity and form inputs

Open `src/components/PizzaForm.jsx`: identify separate useState calls for name, size, price and description. Trace a value prop and its onChange setter. Explain `event.target.value`, numeric conversion, validation, and `event.preventDefault()` in handleSubmit.

Open `src/App.jsx`: identify useEffect, Axios GET `/json/pizzas.json`, loading/error state and AbortController cleanup. The effect is declared in the parent so route navigation does not replace edited records with the initial JSON. React StrictMode may run an extra setup/cleanup cycle in development; cleanup cancels the obsolete request.

Demonstrate: submit empty fields, then valid fields. Show JSON retrieval in the Network panel if available. Do not describe useEffect as universally running exactly once.

## LO3 — Components and props

Open `src/components/PizzaCard.jsx`: identify the pizza and onRequestDelete props. Open `src/pages/PizzaMenu.jsx` and show how map creates each card with a stable pizza.id key.

Open `src/components/PizzaForm.jsx`: explain initialPizza and onSave. The same form is reused by AddPizza and EditPizza. The key on the edit form makes record changes initialise the correct local draft.

Demonstrate: compare two pizza cards, then open a prefilled edit form.

## LO4 — Shared state and immutable CRUD

Open `src/App.jsx`: identify the parent-owned pizzas array. Show how Dashboard and PizzaMenu receive the same array. Children request changes using callbacks passed through props. Form draft values stay local; committed records have one source of truth.

- Create: addPizza uses a unique UUID and `[...current, newRecord]`.
- Read: PizzaMenu maps the shared array into cards.
- Update: updatePizza uses map and spreads the matching record into a new object.
- Delete: deletePizza uses filter to return a new array without the target ID.

Demonstrate: add “Assessor Special”, navigate to the dashboard and show the increased count, edit its price, cancel a deletion, then confirm deletion. Show the count returning to its original value. Explain that changes reset on refresh; this is frontend state CRUD.

## LO5 — Routing

Open the Switch and Route declarations in `src/App.jsx`:

| Path | Component |
| --- | --- |
| `/` | Dashboard |
| `/pizzas` | PizzaMenu |
| `/add-pizza` | AddPizza |
| `/edit-pizza/:id` | EditPizza |

Show Link navigation and useLocation in AddPizza/EditPizza. The dynamic ID selects a record; missing IDs and unmatched paths show helpful messages. App remains mounted while views change.

Demonstrate: visit each route, point out URL changes, use browser Back, and save a form to show programmatic navigation.

## Suggested 15-minute presentation

| Minutes | Demonstration |
| --- | --- |
| 0–2 | Purpose, setup, file entry points, and reactivity |
| 2–5 | Forms, hooks, validation, and initial JSON request |
| 5–7 | Reusable components and props |
| 7–11 | Create, read, update, delete and shared dashboard state |
| 11–13 | Four routes and navigation |
| 13–15 | Testing, limitations and assessor questions |

## Requirement checklist

- [x] React frontend with permitted libraries only
- [x] At least two useState hooks
- [x] At least one useEffect
- [x] At least two processed form controls
- [x] Reusable components accepting props
- [x] Axios consumes a JSON file
- [x] Shared state across components
- [x] Array create/update/delete operations
- [x] At least three routes (four implemented)
- [ ] Submit repository URL and source ZIP through LMS

## Course sources

Assessment handout and uploaded lessons 1–12 informed the implementation. Lessons 5–11 directly support forms, lists, effects, CRUD, lifting state and routing. Context API (Lesson 12) is optional and is not used in this version.
