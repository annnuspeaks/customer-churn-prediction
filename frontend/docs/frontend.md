# Customer Churn Prediction — Frontend Engineering Documentation

## Document Description

This document is the detailed engineering documentation for the frontend application of the Customer Churn Prediction Platform.

The frontend provides the user-facing interface through which users can access the customer churn prediction system, navigate between application areas, submit prediction inputs, view prediction results, access support resources, and interact with global interface controls.

The frontend is designed as a modern, responsive, production-oriented React application with a strong emphasis on usability, visual consistency, maintainability, accessibility, and clean component architecture.

The frontend communicates with the backend prediction service through a REST API. The backend is implemented using FastAPI and exposes the machine learning prediction functionality required by the frontend.

The frontend deployment strategy is designed around a free-tier-friendly hosting model, with the frontend intended for deployment through Vercel and the backend through Render.

The interface follows a modern glassmorphism-inspired visual language while maintaining practical usability across desktop, tablet, and mobile devices.

---

# PHASE 10 — FRONTEND DASHBOARD

## Phase Objective

Phase 10 is responsible for building the complete frontend dashboard and user interface for the Customer Churn Prediction Platform.

The phase begins with a completely fresh frontend implementation rather than reusing the implementation of another project.

The frontend is structured so that presentation, page-level composition, reusable components, global styling, navigation, prediction functionality, and API communication remain clearly separated.

The major objectives of Phase 10 are:

- Establish a maintainable React frontend architecture.
- Create a consistent visual design system.
- Implement the main application navigation.
- Build the Home page.
- Build the Prediction interface.
- Build the Prediction Results interface.
- Build the Support page.
- Implement responsive behavior.
- Implement global floating controls.
- Integrate the frontend with the FastAPI backend.
- Validate the complete frontend-to-backend prediction workflow.
- Prepare the frontend for free-tier deployment through Vercel.

---

## 10.1 — UI DESIGN

### UI Design Objective

The UI Design subphase establishes the complete visual and structural foundation of the frontend.

The design direction is inspired by the visual quality and interaction style of the existing Fraud Detection System frontend while remaining a separate implementation designed specifically for the Customer Churn Prediction Platform.

The interface should feel modern, polished, interactive, professional, and suitable for presentation as an ML engineering portfolio project.

The primary visual direction includes:

- Dark-first interface.
- Optional light theme.
- Glassmorphism-inspired cards.
- Subtle borders.
- Backdrop blur.
- Smooth transitions.
- Green accent color.
- Large, highly readable typography.
- Responsive layouts.
- Clear navigation.
- Interactive cards.
- Minimal visual clutter.
- Strong first-viewport composition.

The Home page should use a two-column desktop composition in the primary viewport.

The left side should contain the primary product message, title, supporting description, and relevant call-to-action content.

The right side should contain a visually attractive interactive glass card that directs the user toward the Prediction interface.

The application should contain three primary navigation destinations:

- Home
- Prediction
- Support

The interface also contains global floating controls.

These controls are independent of page content and should remain fixed relative to the viewport.

The planned global controls are:

- Theme control near the top-right area.
- Move-to-top control near the bottom-right area.

These controls must remain stable while the page is scrolled.

---

### 10.1.1 — Fresh Frontend Project Setup

#### Objective

The frontend project was initialized as a completely fresh React application using Vite.

The frontend is intentionally independent from the existing Fraud Detection System frontend implementation.

The Fraud Detection System UI is used only as a visual/reference direction where appropriate.

No existing fraud detection frontend source code is being reused as the foundation of this project.

#### Project Location

The frontend is located inside the Customer Churn Prediction project:

```text
customer-churn-prediction/
└── frontend/
```

#### Initialization

The frontend was initialized using Vite with the React template.

The initialization command was:

```bash
npm create vite@latest . -- --template react
```

Vite created the frontend project in the existing ```frontend``` directory.

The project initialization process also installed the initial project dependencies and started the development server.

#### Development Server

The Vite development server is available locally at:

```text
http://localhost:5173/
```

The development server provides hot module replacement during frontend development.

This allows changes to frontend source files to be reflected in the browser without manually restarting the development server in normal development scenarios.

#### Linting

The Vite project initialization included ESLint configuration.

ESLint is used as the project's static code-quality and linting foundation.

#### Icon Library

The project uses Lucide React for interface icons.

The package was installed using:

```bash
npm install lucide-react
```

Lucide icons will be used selectively where icons improve usability and visual clarity.

Icons should not be added purely for decoration when they reduce clarity or introduce unnecessary visual noise.

#### Frontend Technology Direction

The frontend technology foundation is:
 - React
 - Vite
 - JavaScript / JSX
 - CSS
 - React Router
 - Lucide React

The project does not use Expo or React Native.

The frontend is a web application.

#### Styling Strategy

The project uses regular CSS rather than a utility-first CSS framework.

The styling strategy is based on component-specific CSS files.

Each major component or page should maintain its own stylesheet.

Example:

```text
Navbar.jsx
Navbar.css
```

and:

```text
Footer.jsx
Footer.css
```

This approach keeps component styling localized and makes individual UI sections easier to maintain.

#### Initial Setup Status

The following setup tasks were completed:
 - Fresh Vite React project created.
 - Frontend directory initialized.
 - Dependencies installed.
 - ESLint foundation created.
 - Lucide React installed.
 - Development server verified.
 - Local frontend URL verified.

#### Setup Completion

10.1.1 is considered complete and locked.

### 10.1.2 — Frontend Architecture & Folder Structure

#### Objective

The frontend architecture was established before implementing the actual application UI.

The goal is to separate:
 - Reusable components.
 - Page-level components.
 - Global styling.
 - Component-specific styling.
 - Static assets.
 - Documentation.

The architecture is intentionally simple enough for a portfolio project while remaining scalable enough to support the prediction workflow.

#### Frontend Structure

The planned structure is:

```text
frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   │
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   │
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   │
│   │   ├── ThemeToggle/
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── ThemeToggle.css
│   │   │
│   │   └── BackToTop/
│   │       ├── BackToTop.jsx
│   │       └── BackToTop.css
│   │
│   ├── pages/
│   │   │
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   │
│   │   ├── Prediction/
│   │   │   ├── Prediction.jsx
│   │   │   └── Prediction.css
│   │   │
│   │   └── Support/
│   │       ├── Support.jsx
│   │       └── Support.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── docs/
│   └── frontend.md
│
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

#### Component Architecture

Reusable interface elements are stored under:

```text
src/components/
```

The initial component groups are:
 - Navbar
 - Footer
 - ThemeToggle
 - BackToTop

Each component has its own JSX file and CSS file.

This means component implementation and component styling remain colocated.

For example:

```text
components/
└── Navbar/
    ├── Navbar.jsx
    └── Navbar.css
```

#### Page Architecture

Complete navigable application screens are stored under:

```text
src/pages/
```

The initial pages are:

```text
Home
Prediction
Support
```

Each page maintains its own JSX and CSS file.

For example:

```text
pages/
└── Prediction/
    ├── Prediction.jsx
    └── Prediction.css
```

#### Components vs Pages

The architecture follows a clear distinction.

#### Components

Components represent reusable or globally significant interface elements.

Examples:
 - Navbar
 - Footer
 - ThemeToggle
 - BackToTop

#### Pages

Pages represent complete navigable destinations.

Examples:
 - Home
 - Prediction
 - Support

A page may contain multiple reusable components.

#### Global Styling

Global styling is divided between:

```text
src/index.css
src/App.css
```

```index.css``` is responsible for global design foundations and browser-level normalization.

```App.css``` contains application-level layout utilities and shared visual helpers that are not tied to a specific component.

Component-specific visual rules should remain in component CSS files.

#### Documentation

Frontend engineering documentation is stored separately:

```text
frontend/docs/frontend.md
```

The document will grow throughout the frontend development phases and will eventually contain detailed documentation of the complete frontend architecture, UI decisions, components, pages, API integration, testing, deployment, and operational considerations.

#### Architecture Principles

The frontend architecture follows these principles:
 - Keep components modular.
 - Keep page-level composition separate from reusable components.
 - Keep component-specific styles in dedicated CSS files.
 - Avoid unnecessary global CSS.
 - Keep routing centralized at the application level.
 - Keep global controls independent from page content.
 - Avoid unnecessary dependencies.
 - Prefer readable JSX over excessive abstraction.
 - Keep the frontend ready for backend API integration.
 - Maintain responsive behavior from the beginning rather than adding it only at the end.

#### Architecture Completion

10.1.2 is considered complete and locked.

### 10.1.3 — Global Design System & Theme Foundation

The frontend uses a centralized CSS design-token system to maintain visual consistency across all pages and components.

#### Theme System

Two visual themes are defined:
 - Dark theme — primary application theme
 - Light theme — alternate accessible theme

Theme values are exposed through CSS custom properties, allowing individual components to consume shared colors without hard-coding component-specific values.

#### Color System

The design system defines tokens for:
 - Primary background
 - Secondary background
 - Tertiary background
 - Surface backgrounds
 - Borders
 - Primary text
 - Secondary text
 - Muted text
 - Accent color
 - Accent hover state
 - Accent soft background
 - Accent border
 - Danger
 - Warning
 - Information

#### Glassmorphism System

The frontend defines reusable glass design tokens covering:
 - Glass background
 - Glass hover background
 - Glass border
 - Backdrop blur

Interactive glass surfaces additionally use transitions, hover elevation, accent borders, and accent shadows.

#### Typography

A centralized typography system defines:
 - Base font family
 - Font-size scale
 - Hero typography
 - Font-weight scale
 - Line-height scale

#### Spacing

A reusable spacing scale is provided through CSS custom properties so that components maintain consistent vertical and horizontal rhythm.

#### Shape System

Shared border-radius tokens are defined for:
 - Small surfaces
 - Medium surfaces
 - Large surfaces
 - Extra-large surfaces
 - Pill-shaped controls

#### Shadow System

Three general elevation levels and an accent shadow are available for cards, controls, and interactive surfaces.

#### Motion System

The frontend defines fast, normal, and slow transition tokens.

Components should consume these tokens rather than introducing arbitrary transition durations.

#### Layout Foundation

The design system defines:
 - Maximum content width
 - Responsive horizontal container padding
 - Shared section spacing

#### Z-Index System

Dedicated z-index levels are defined for:
 - Base content
 - Navbar
 - Overlays
 - Floating controls
 - Modal layers

This is particularly important for the global theme control and move-to-top control planned for the frontend.

#### Global CSS Foundation

The global stylesheet provides:
 - Box-sizing reset
 - Body defaults
 - Typography defaults
 - Button/input inheritance
 - Link normalization
 - Image and SVG normalization
 - List normalization
 - Heading and paragraph margin reset
 - Text selection styling
 - Custom scrollbar styling

#### Responsive Foundation

Responsive CSS variables adjust hero typography and container spacing across desktop, tablet, and mobile breakpoints.

The design system therefore provides the visual foundation required by the subsequent frontend components without coupling component-specific styles to the global stylesheet.

#### Design System Completion

10.1.3 is considered complete and locked.

### 10.1.4 — Navigation System

#### Objective

The navigation system establishes the application's primary client-side routes.

The application contains three primary destinations:
 - Home
 - Prediction
 - Support

React Router is used for client-side navigation.

#### Routing Dependency

React Router was added to the frontend project using:

```bash
npm install react-router-dom
```

#### Route Structure

The frontend defines the following routes:

```text
/              → Home
/prediction    → Prediction
/support       → Support
```

#### Home Route

The root route:

```text
/
```

renders the Home page.

The Home page will eventually contain the primary product introduction, feature presentation, prediction call-to-action, and other landing-page content.

At this stage the page acts as a routing target and is intentionally minimal.

#### Prediction Route

The route:

```text
/prediction
```

renders the Prediction page.

This page will later contain the customer churn prediction form and associated interaction workflow.

At this stage it acts as a routing target and is intentionally minimal.

#### Support Route

The route:

```text
/support
```

renders the Support page.

The Support page will later contain user assistance, product information, usage guidance, and relevant support resources.

At this stage it acts as a routing target and is intentionally minimal.

#### Unknown Routes

Unknown routes are redirected to the Home page.

The routing behavior uses a catch-all route:

```text
*
```

which redirects to:

```text
/
```

This prevents users from remaining on an undefined frontend route.

#### Application-Level Router

Routing is centralized in:

```text
src/App.jsx
```

The application uses:

```bash
BrowserRouter
Routes
Route
Navigate
```

The routing structure is therefore kept separate from individual page implementations.

#### Current Route Configuration

The current route configuration is conceptually:

```bash
<BrowserRouter>
  <div className="app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/support" element={<Support />} />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  </div>
</BrowserRouter>
```

#### Navigation Architecture Decision

The navigation architecture intentionally separates routing from visual navigation controls.

The Navbar will consume these routes later.

The Navbar itself is not part of 10.1.4.

The Navbar implementation will be completed as a separate component task.

This separation allows routing behavior to remain stable while the visual navigation interface evolves.

#### Current Page State

At the completion of 10.1.4, the individual page components are intentionally minimal route targets.

The current Home page returns:

```bash
<main>Home Page</main>
```

The current Prediction page returns:

```bash
<main>Prediction Page</main>
```

The current Support page returns:

```bash
<main>Support Page</main>
```

These temporary contents will be replaced during their respective UI implementation tasks.

#### Navigation Validation

The navigation foundation should be validated using:

```text
http://localhost:5173/
http://localhost:5173/prediction
http://localhost:5173/support
```

An undefined route such as:

```text
http://localhost:5173/random-page
```

should redirect to:

```text
http://localhost:5173/
```

#### Navigation Completion

10.1.4 is considered complete and locked.

