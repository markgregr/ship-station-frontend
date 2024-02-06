// AppRoutes.tsx
import { RouteObject, useRoutes } from "react-router-dom";
import ShipListPage from "./pages/ShipListPage";
import ShipDetailsPage from "./pages/ShipDetailsPage";
import AuthPage from "./pages/AuthPage";
import RequestDetailsPage from "./pages/RequestDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import RequestListPage from "./pages/RequestListPage";
import { MainLayout } from "./components/MainLayout/MainLayout";

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ShipListPage />,
      },
      {
        path: "/ship/:id",
        element: <ShipDetailsPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/request",
        element: <RequestListPage />,
      },
      {
        path: "/request/:id",
        element: <RequestDetailsPage />,
      },
      {
        path: "/ship", // Добавлено
        element: <ShipListPage />, // Добавлено
      },
      {
        path: "/register", // Добавлено
        element: <RegisterPage />, // Добавлено
      },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
