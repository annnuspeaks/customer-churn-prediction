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

Vite created the frontend project in the existing `frontend` directory.

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

`index.css` is responsible for global design foundations and browser-level normalization.

`App.css` contains application-level layout utilities and shared visual helpers that are not tied to a specific component.

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

### 10.1.5 — Global Floating Controls

### Objective

The Global Floating Controls subsystem provides viewport-level controls that remain independent of individual application pages.

The controls are designed to remain available while users navigate between Home, Prediction, and Support and while page content is scrolled.

The initial global controls are:

- Theme Toggle
- Back-to-Top Control

The controls are implemented as independent reusable React components.

Each component maintains its own JSX and CSS files.

## Global Control Architecture

The global controls are located under:

```text
src/
└── components/
    ├── ThemeToggle/
    │   ├── ThemeToggle.jsx
    │   └── ThemeToggle.css
    │
    └── BackToTop/
        ├── BackToTop.jsx
        └── BackToTop.css
```

The controls are mounted at the application level rather than inside individual pages.

This prevents page-specific implementations from being duplicated across Home, Prediction, and Support.

#### 10.1.5.1 — Architecture & Component Structure

##### Objective

The first subphase established the component architecture for global viewport-level controls.

Two dedicated components were defined:

- ThemeToggle
- BackToTop

Each component has a dedicated stylesheet.

This follows the project's component-specific styling architecture.

##### ThemeToggle

The ThemeToggle component is responsible for presenting the user's current theme state and providing the interaction required to switch between supported themes.

Its implementation is located at:

```text
src/components/ThemeToggle/
├── ThemeToggle.jsx
└── ThemeToggle.css
```

##### BackToTop

The BackToTop component is responsible for providing a viewport-level mechanism for returning the user to the top of a long page.

Its implementation is located at:

```text
src/components/BackToTop/
├── BackToTop.jsx
└── BackToTop.css
```

##### Global Mounting Strategy

The global controls are intended to be mounted at the application level.

Conceptually:

```text
App
│
├── Global Floating Controls
│   ├── ThemeToggle
│   └── BackToTop
│
└── Application Routes
    ├── Home
    ├── Prediction
    └── Support
```

This ensures that global controls are independent from individual page implementations.

##### Positioning Strategy

The controls use viewport-level positioning rather than normal document flow.

The design system provides a dedicated floating z-index layer for these controls.

The controls therefore remain visually independent from page content.

#### 10.1.5.2 — Theme Toggle Implementation

##### Objective

The second subphase implements the first functional global floating control: the Theme Toggle.

The implementation provides a compact glass-style control positioned independently from the page content.

##### Component

The implementation is located at:

```text
src/components/ThemeToggle/ThemeToggle.jsx
```

The component receives two values through props:

```text
theme
onToggle
```

`theme` represents the currently active theme.

`onToggle` provides the state transition callback controlled by the application layer.

##### Icon System

Lucide React is used for theme-state icons.

The component displays:

- Moon icon for dark theme.
- Sun icon for light theme.

The icon therefore communicates the currently active theme and the available state transition.

##### Theme Label

The control displays the current theme label:

```text
Dark
```

or:

```text
Light
```

The label is hidden on very narrow screens so the control can become a compact icon-only control.

##### Accessibility

The control uses a semantic HTML button.

An accessible `aria-label` is dynamically generated based on the current theme.

A matching `title` attribute is also provided for pointer-based users.

The button can therefore be operated using standard keyboard interaction.

##### Visual Design

The Theme Toggle follows the application's glassmorphism design system.

The control uses:

- Glass background.
- Glass border.
- Backdrop blur.
- Rounded pill shape.
- Application shadow tokens.
- Accent-colored icon container.
- Accent hover border.
- Smooth transitions.

##### Desktop Position

The control is positioned independently in the top-right portion of the viewport.

The intended desktop positioning is:

```text
top: 1.25rem
right: 1.5rem
```

The control uses the global floating z-index layer.

##### Hover Interaction

Hovering over the control produces:

- Slight upward movement.
- Increased glass surface visibility.
- Accent border emphasis.
- Accent shadow.

The interaction remains subtle to avoid distracting from the primary application content.

##### Keyboard Focus

A visible focus state is provided through:

- Accent-colored outline.
- Additional outline offset.

This improves keyboard accessibility without changing the component's normal visual appearance.

##### Responsive Behavior

At tablet-sized widths, the control moves closer to the viewport edges.

At very narrow mobile widths, the text label is hidden and the control becomes an icon-focused circular control.

This prevents the floating control from occupying unnecessary horizontal space on small screens.

##### Current Theme State

The current implementation supports:

```text
Dark
Light
```

The initial application state is:

```text
dark
```

The active theme is applied through the document root using:

```text
data-theme
```

The global CSS design system then resolves the corresponding CSS custom properties.

##### Persistence Scope

Persistent theme storage is intentionally not part of 10.1.5.2.

At this stage the theme state exists in React application state.

Consequently, refreshing the browser resets the application to its initial dark theme.

Theme persistence will be implemented separately in:

```text
10.1.5.3 — Persistent Theme State
```

##### Validation

The Theme Toggle implementation was visually validated in the browser.

The control appears independently in the upper-right area of the viewport.

The dark-theme state is displayed correctly.

The component architecture and stylesheet separation were also verified.

#### 10.1.5.3 — Persistent Theme State

Theme selection is persisted using browser `localStorage`.

##### Implementation

- Added a dedicated theme storage key.
- Restores the saved `light` or `dark` theme on application startup.
- Saves theme changes automatically.
- Falls back to `dark` when no valid saved theme exists.

##### Validation

Verified that:

- Light theme survives browser refresh.
- Dark theme survives browser refresh.
- Theme remains consistent across application routes.

#### 10.1.5.4 — Back-to-Top Implementation

Implemented the global Back-to-Top control.

- Uses Lucide `ArrowUp` icon.
- Appears after the user scrolls beyond 300px.
- Uses fixed viewport positioning.
- Smoothly scrolls the page back to the top.
- Includes accessible label and title.
- Responsive bottom-right positioning.

The current minimal pages may not produce enough scrollable content to display the control; this is expected. It will become visible once longer page content is implemented.

#### 10.1.5.5 — Fixed Positioning & Layering

Both global floating controls use viewport-fixed positioning and the dedicated `--z-floating` layer.

- Theme Toggle: fixed top-right.
- Back-to-Top: fixed bottom-right.
- Both remain independent of page content and scrolling.
- Floating controls use z-index `900`, above normal content and below modal layers.
- No conflicting application-level stacking context was identified.

#### 10.1.5.6 — Responsive Floating Controls

Both global floating controls were reviewed for responsive behavior.

- Theme Toggle adapts its position at tablet widths and becomes icon-only on narrow mobile screens.
- Back-to-Top reduces its viewport offsets on smaller screens.
- Both controls retain fixed positioning and the global floating z-index.
- Existing 1024px, 768px and 480px responsive foundations support the controls.

#### 10.1.5.7 — Final Floating Controls Review

The global floating controls were reviewed for functionality, persistence, positioning, layering, responsiveness, and accessibility.

Both Theme Toggle and Back-to-Top controls passed the final review without requiring code amendments.

### 10.1.6 Navbar Implementation

Implemented the global glass Navbar foundation and navigation structure.

#### 10.1.6.1 Navbar Architecture

Defined the Navbar component architecture with separate JSX and CSS, supporting brand identity, primary navigation, responsive styling, and future interaction states.

#### 10.1.6.2 — Desktop Navbar UI

Implemented the desktop glass Navbar with:

- Centered constrained Navbar container.
- Brand section.
- Home, Prediction and Support navigation.
- Glassmorphism styling.
- Responsive-safe spacing.
- Hover and keyboard focus states.
- Independent positioning from global floating controls.

Page content remains independent from the Navbar's constrained width.

#### 10.1.6.3 — Navigation Links & Icons

Enhanced the primary navigation with Lucide icons for Home, Prediction, and Support.

- Added semantic navigation icons.
- Preserved route destinations.
- Added icon spacing and hover interaction.
- Maintained keyboard focus accessibility.

#### 10.1.6.4 — Mobile Navbar

Implemented the responsive mobile Navbar with a hamburger menu.

- Added responsive menu toggle.
- Added Home, Prediction and Support navigation.
- Integrated Theme Toggle inside the mobile menu.
- Removed the separate floating theme control on mobile.
- Preserved the independent desktop Theme Toggle.
- Added responsive glass styling and accessibility states.

#### 10.1.6.5 — Active Route & Interactions

Implemented route-aware navigation using React Router `NavLink`.

- Added active styling for Home, Prediction and Support.
- Used `end` for the Home route.
- Preserved mobile menu closing behavior.
- Maintained keyboard focus states.

#### 10.1.6.6 — Final Navbar Review

Completed the final Navbar review covering desktop UI, navigation, active routes, mobile menu, theme integration, responsiveness, layering, and accessibility.

No further Navbar amendments are required.

### 10.1.7 — Home Page UI

Established the Home page as the primary landing experience with a full-width responsive foundation.

#### 10.1.7.1 — Home Architecture & Component Structure

Created a dedicated `Home.jsx` and `Home.css` structure for isolated page content and styling.

#### 10.1.7.2 — Hero / Intro Content

Implemented the Home hero with:

- AI-focused eyebrow
- Primary churn prediction headline
- Supporting descriptions
- Prediction CTA
- Responsive typography
- Dark/light theme compatibility

#### 10.1.7.3 — Home Hero & Prediction Card Refinement

##### Objective

Refine the Home page hero section for responsive behavior, clear CTA separation, and improved visual interaction.

##### Completed

- Implemented responsive two-column desktop hero layout.
- Converted the mobile layout into a single vertical stack.
- Replaced the left-side "Start Prediction" CTA with "View Documentation".
- Separated the Prediction Card from its CTA navigation.
- Made only "Start Prediction" navigate to `/prediction`.
- Added animated customer/person visual elements around the ML analysis icon.
- Improved card hover, CTA, spacing, and responsive behavior.
- Verified the updated layout in desktop and mobile views.

##### Result

The Home page now provides a cleaner responsive experience with clear navigation boundaries and a more dynamic ML-focused visual presentation.

#### 10.1.7.4 — Two-Column Layout & Spacing

Implemented the Home page desktop two-column layout with responsive spacing and alignment.

- Hero content on the left.
- Prediction Card on the right.
- Responsive grid spacing and sizing.
- Mobile layout switches to a vertical stack.

#### 10.1.7.5 — Glass UI & Interactions

Refined the Home page glass UI with subtle transparency, blur, glow, hover elevation, CTA interaction, animated visual elements, and reduced-motion support.

#### 10.1.7.6 — Responsive Home Layout

Implemented responsive Home layouts for desktop, tablet, and mobile.

- Desktop uses a two-column layout.
- Tablet switches to a stacked layout.
- Mobile uses a vertical stack.
- Small screens receive compact spacing and full-width CTA handling.
- Prevents horizontal layout issues.

#### 10.1.7.7 — Final Home Page Review

Completed final review of the Home page across desktop and mobile layouts.

- Verified Hero section and Prediction Card.
- Verified glass UI and interactions.
- Verified dark/light themes.
- Verified responsive stacking.
- Verified mobile hamburger navigation and theme control.
- No major UI or structural issues remain.
