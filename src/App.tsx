import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import ShipDetailsPage from "./pages/ShipDetailsPage";
import ShipListPage from "./pages/ShipListPage";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ShipListPage></ShipListPage>}></Route>
        <Route
          path="/ship/:id"
          element={<ShipDetailsPage></ShipDetailsPage>}
        ></Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
