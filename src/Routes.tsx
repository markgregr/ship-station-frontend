// AppRoutes.tsx
import { RouteObject, useRoutes } from "react-router-dom";
import BaggageListPage from "./pages/BaggageListPage";
import BaggageDetailsPage from "./pages/BaggageDetailsPage";
import AuthPage from "./pages/AuthPage";
import DeliveryDetailsPage from "./pages/DeliveryDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DeliveryListPage from "./pages/DeliveryListPage";
import { MainLayout } from "./components/MainLayout/MainLayout";
import CreateBaggagePage from "./pages/CreateBaggagePage";
import EditBaggagePage from "./pages/EditBaggagePage";

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <BaggageListPage />,
      },
      {
        path: "/baggage/:id",
        element: <BaggageDetailsPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/delivery",
        element: <DeliveryListPage />,
      },
      {
        path: "/delivery/:id",
        element: <DeliveryDetailsPage />,
      },
      {
        path: "/baggage",
        element: <BaggageListPage />,
        // children: [
        //   {
        //     path: "create",
        //     element: <CreateBaggagePage />,
        //   },
        // ],
      },
      {
        path: "/register", // Добавлено
        element: <RegisterPage />, // Добавлено
      },
      {
        path: "/baggage/create", // Добавлено
        element: <CreateBaggagePage />, // Добавлено
      },
      {
        path: "/baggage/:id/update", // Добавлено
        element: <EditBaggagePage />, // Добавлено
      },
      {
        path: "*",
        element: <BaggageListPage />,
      },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
