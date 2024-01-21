import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/BaggageListPage";
import BaggagePage from "./pages/BaggageDetailsPage";
import HomePage from "./pages/HomePage";

// const router = createBrowserHashRouter([
//   {
//     path: "/",
//     element: <HomePage></HomePage>,
//   },
//   {
//     path: "/baggage",
//     element: <MainPage></MainPage>,
//   },
//   {
//     path: "/baggage/:id",
//     element: <BaggagePage></BaggagePage>,
//   },
// ]);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/about" element={<HomePage></HomePage>}></Route>
        <Route path="/baggage" element={<MainPage></MainPage>}></Route>
        <Route
          path="/baggage/:id"
          element={<BaggagePage></BaggagePage>}
        ></Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
