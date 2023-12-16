import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/BaggageListPage";
import BaggagePage from "./pages/BaggageDetailsPage";
import HomePage from "./pages/HomePage"; // Добавил импорт

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        {/* <Route path="/" element={<HomePage />}></Route> */}
        <Route path="/baggage" element={<MainPage />}></Route>
        <Route path="/baggage/:id" element={<BaggagePage />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
