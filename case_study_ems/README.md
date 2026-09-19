# Employee Management System (OpenUI5 Case Study)

A proper, npm-based OpenUI5 project — `package.json` + `ui5.yaml` + `webapp/` —
implementing an Employee Management System with **full CRUD**, **search**, and
**separate routed pages** (not a popup dialog) for List / Create / Edit / Profile.

## Features

- **List page** — search across Name, Department, Working Location, Previous
  Organisation; table with an avatar, key fields, and View / Edit / Delete actions.
- **Create page** — its own route (`#/create`) and its own page/controller.
- **Edit page** — its own route (`#/edit/{employeeId}`) and its own page/controller,
  pre-filled from the selected employee.
- **Profile page** — its own route (`#/profile/{employeeId}`): a read-only view
  with a profile picture (`sap.m.Avatar` — shows the picture if a `PhotoUrl` is
  set, otherwise falls back to the employee's initials), grouped personal /
  employment / vehicle / skills details, and the full work-history table.
- **Fields covered:** Name, Address, Deposit, Joining Date, Department, Working
  Location, Owns Vehicle, Vehicle Type, Previous Organisation, Skills, Work
  Experience History (multiple company/designation/duration rows).
- **Validation:** required fields, minimum lengths, numeric deposit ≥ 0, joining
  date required and not in the future, vehicle type required only when "Owns
  Vehicle" is checked, at least one skill required.
- **Navigation:** real `sap.m.routing.Router` with back buttons on every
  sub-page — not a single-page dialog.

## How to run

Requires [Node.js](https://nodejs.org) (which includes npm).

```bash
npm install
npm start
```

`npm start` runs the UI5 CLI's dev server and opens the app in your browser
automatically (default: `http://localhost:8080/index.html`). If it doesn't
open automatically, or you want it silent, use `npm run start-noopen` and
open that URL yourself.

**First run needs internet access** — the UI5 CLI downloads the OpenUI5
framework version pinned in `ui5.yaml` into a local cache the first time you
run it. After that first download it's cached and subsequent runs work
offline.

If `npm start` fails immediately, check:
- Node.js is installed (`node -v`) — v18+ recommended.
- You ran `npm install` first, so `@ui5/cli` is actually present.
- Nothing else is already using port 8080 (or pass `--port` to `ui5 serve`).

## Project structure

```
package.json                   npm scripts + @ui5/cli devDependency
ui5.yaml                       UI5 CLI / framework configuration
webapp/
  index.html                   Bootstraps UI5, mounts the Component
  Component.js                 Loads data model, starts the router
  manifest.json                App descriptor incl. full routing config
  model/
    mockdata.json              Seed data: employees + dropdown value lists
    formatter.js                Avatar initials, skills list formatting
    ValidationHelper.js        Shared field validation + draft->employee mapping
  view/
    App.view.xml               Root shell (router outlet)
    EmployeeList.view.xml      List page (search + table)
    EmployeeCreate.view.xml    Create page
    EmployeeEdit.view.xml      Edit page
    EmployeeProfile.view.xml   Profile page (picture + full details)
    fragment/
      EmployeeForm.fragment.xml   Form fields shared by Create & Edit pages
  controller/
    App.controller.js
    BaseController.js          Shared router/navigation helpers
    EmployeeList.controller.js
    EmployeeCreate.controller.js
    EmployeeEdit.controller.js
    EmployeeProfile.controller.js
  css/style.css
```

## Data storage

Data lives in an in-memory `sap.ui.model.json.JSONModel` on the Component,
seeded from `model/mockdata.json`, so every page (List/Create/Edit/Profile)
reads and writes the same shared array. There's no backend, so a full page
refresh resets to the seed data — that keeps the case study self-contained.
To wire it to a real backend, replace the `getOwnerComponent().getModel()`
array mutations in the controllers with `ODataModel` calls or `fetch`/AJAX
requests; the views and validation logic would not need to change.

## Profile pictures

The `PhotoUrl` field (in Create/Edit) accepts a direct image URL. Leave it
blank and the Avatar automatically shows the employee's initials instead —
no file upload/storage needed for this case study.

## Possible extensions

- Persist to a backend (OData service, Node/Express REST API, or
  `localStorage` for a quick demo).
- Real photo upload (`sap.ui.unified.FileUploader`) instead of a URL field.
- Sorting, column filters, and pagination on the list.
- QUnit/OPA5 tests for `ValidationHelper` and the navigation flow.
