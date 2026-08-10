import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BackToTop from "./components/BackToTop/BackToTop";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

import Home from "./pages/Home/Home";
import Prediction from "./pages/Prediction/Prediction";
import Support from "./pages/Support/Support";

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
      <div className="app">
        <Navbar theme={theme} onToggle={handleThemeToggle} />

        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        <BackToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/support" element={<Support />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
