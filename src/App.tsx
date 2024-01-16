// App.tsx
import React from "react";
import { AppRoutes } from "./Routes";
import { BrowserRouter, HashRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
