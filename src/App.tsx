import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/BaggageListPage";
import BaggagePage from "./pages/BaggageDetailsPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/baggage",
    element: <MainPage></MainPage>,
  },
  {
    path: "/baggage/:id",
    element: <BaggagePage></BaggagePage>,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
