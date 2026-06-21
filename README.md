To login
Username: emilys
password: emilyspass

# PortalCore — Workforce Management Portal

A responsive workforce management web application that allows administrators to manage employees, departments, and task assignments through a secure, role-protected dashboard.

Technologies

Framework | Angular (NgModule architecture, non-standalone)
Language | TypeScript
Styling | Bootstrap 5
Icons | Bootstrap Icons
Forms | Angular Reactive Forms & Template-driven Forms
HTTP | Angular HttpClient |
Auth API | DummyJSON (`https://dummyjson.com/user/login`)
Persistence | Browser localStorage

---

Features

Authentication

- Login form built with Angular Reactive Forms
- JWT access token stored in localStorage on successful login
- Inline error alert displayed on invalid credentials

Route Guards

- AuthGuard — blocks unauthenticated users from accessing the dashboard and redirects them to `/login`
- LoginRedirectGuard — prevents already-authenticated users from revisiting the login page

Dashboard

- Persistent sidebar navigation with active link highlighting
- Responsive mobile toggle for the sidebar
- Statistics bar always visible showing live KPIs: total employees, total departments, active tasks, and task completion rate — all computed from localStorage

Employee Module

- Full employee directory table
- Add new employees via a validated modal form
- Edit existing employee details
- Delete employees with a confirmation modal
- Real-time search by name or email
- Filter by department
- Sort by name (A–Z) or by status

Department Module

- Card grid view of all departments
- Displays member count, description, and budget utilisation per department
- Budget highlighted in red when utilisation reaches 90% or above
- Add new departments via a validated modal form with a live character counter on the description field

Task Assignment Module

- Task board table showing task name, assigned employee, department, due date, and status
- Tasks automatically sorted by workflow priority: To Do → In Progress → Done
- Status badges colour-coded per state
- Assigned employee details (name, email, department) resolved dynamically by employee ID
- Add new tasks via a modal form with employee dropdown populated from the current employee list
- Client-side pagination — 4 tasks per page

# WorkforceManagement

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
