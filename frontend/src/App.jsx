import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BackToTop from "./components/BackToTop/BackToTop";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import ScrollManager from "./components/ScrollManager/ScrollManager";

import Home from "./pages/Home/Home";
import Prediction from "./pages/Prediction/Prediction";
import Support from "./pages/Support/Support";
import Results from "./pages/Results/Results";

import "./App.css";

const THEME_STORAGE_KEY = "customer-churn-theme";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <ScrollManager />
      
      <div className="app">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <Navbar theme={theme} onToggle={handleThemeToggle} />

        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        <BackToTop />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/support" element={<Support />} />
            <Route path="/results" element={<Results />} />
            <Route
              path="/loading-preview"
              element={
                <Loading message="Preparing your prediction..." size="large" />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
