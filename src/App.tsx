// App.tsx
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import BaggageListPage from "./pages/BaggageListPage";
import BaggageDetailsPage from "./pages/BaggageDetailsPage";
import DeliveryListPage from "./pages/DeliveryListPage";
import DeliveryDetailsPage from "./pages/DeliveryDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BaggageListPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/baggage" element={<BaggageListPage />} />
        <Route path="/baggage/:id" element={<BaggageDetailsPage />} />
        <Route path="/delivery" element={<DeliveryListPage />} />
        <Route path="/delivery/:id" element={<DeliveryDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
