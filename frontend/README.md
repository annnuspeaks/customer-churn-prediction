````markdown
# Customer Churn Prediction — Frontend

React + Vite frontend for the Customer Churn Prediction Platform.

## Features

- Customer churn prediction interface
- Prediction results dashboard
- Responsive design
- Dark / Light theme
- React Router navigation
- FastAPI backend integration

## Tech Stack

- React
- Vite
- JavaScript / JSX
- CSS
- React Router
- Lucide React

## Local Development

From the project root:

```bash
cd frontend
npm install
npm run dev
````

Frontend runs by default at:

```text
http://localhost:5173
```

## Production

Live application:

[https://churnmatrix.vercel.app/](https://churnmatrix.vercel.app/)

The frontend is deployed on Vercel and communicates with the production FastAPI backend.

## Structure

```text
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── index.html
├── package.json
└── vite.config.js
```