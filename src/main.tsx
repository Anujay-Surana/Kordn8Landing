import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Admin from "./Admin.tsx";
import Policy from "./Policy.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/privacy" element={<Policy />} />
    </Routes>
  </BrowserRouter>
);