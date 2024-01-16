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
        path: "/baggage", // Добавлено
        element: <BaggageListPage />, // Добавлено
      },
      {
        path: "/register", // Добавлено
        element: <RegisterPage />, // Добавлено
      },
      {
        path: "*",
        element: <HomePage />,
      },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
