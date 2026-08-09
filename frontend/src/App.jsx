import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Prediction from "./pages/Prediction/Prediction";
import Support from "./pages/Support/Support";

import "./App.css";

function App() {
  return (
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
  );
}

export default App;