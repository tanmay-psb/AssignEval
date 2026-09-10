# AssignEval

**AssignEval** is a frontend-only Assignment Evaluation System built
using HTML, CSS, and vanilla JavaScript.

The project provides a web-based interface for managing assignments,
viewing evaluation results, handling user authentication UI, maintaining
a to-do list, and presenting a student dashboard.

## Features

-   User authentication interface
-   Student dashboard
-   Assignment listing and management
-   Assignment evaluation/results interface
-   To-do list
-   Profile page
-   Responsive and modern UI
-   Modular JavaScript files for authentication, data handling,
    evaluation, and utilities
-   Pure frontend implementation with no backend or database

## Tech Stack

-   **HTML5** --- page structure
-   **CSS3** --- styling and responsive layouts
-   **JavaScript (ES6+)** --- client-side functionality
-   **Vercel** --- deployment
-   **Git & GitHub** --- version control and source hosting

## Project Structure

``` text
AssignEval/
├── index.html
├── dashboard.html
├── assignments.html
├── assignment-detail.html
├── profile.html
├── results.html
├── todo.html
├── css/
│   └── main.css
└── js/
    ├── auth.js
    ├── data.js
    ├── evaluation.js
    └── utils.js
```

## Getting Started

No build tools or dependencies are required.

### Run locally

Clone the repository:

``` bash
git clone git@github.com:tanmay-psb/AssignEval.git
cd AssignEval
```

Then open `index.html` in a browser.

For a better local development experience, you can also serve the folder
using a simple local HTTP server.

## Deployment

The project is deployed on **Vercel** and connected to the GitHub
repository.

Any new commit pushed to the production branch can trigger a new
deployment through Vercel's Git integration.

## Current Scope

AssignEval is currently a **frontend prototype**. It does not include a
real backend, database, server-side authentication, or persistent
assignment-evaluation service.

Future versions could add:

-   Backend API
-   Database integration
-   Real authentication and authorization
-   Assignment submission and storage
-   Automated evaluation
-   Plagiarism detection
-   Instructor/admin dashboard
-   Persistent notifications and deadlines

## Author

**Tanmay Pratap Singh**

GitHub: https://github.com/tanmay-psb
