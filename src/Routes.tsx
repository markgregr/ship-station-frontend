// AppRoutes.tsx
import { RouteObject, useRoutes } from "react-router-dom";
import ShipListPage from "./pages/ShipListPage";
import ShipDetailsPage from "./pages/ShipDetailsPage";
import AuthPage from "./pages/AuthPage";
import RequestDetailsPage from "./pages/RequestDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import RequestListPage from "./pages/RequestListPage";
import { MainLayout } from "./components/MainLayout/MainLayout";
import CreateShipPage from "./pages/CreateShipPage";
import EditShipPage from "./pages/EditShipPage";

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
        path: "/ship",
        element: <ShipListPage />,
        // children: [
        //   {
        //     path: "create",
        //     element: <CreateShipPage />,
        //   },
        // ],
      },
      {
        path: "/register", // Добавлено
        element: <RegisterPage />, // Добавлено
      },
      {
        path: "/ship/create", // Добавлено
        element: <CreateShipPage />, // Добавлено
      },
      {
        path: "/ship/:id/update", // Добавлено
        element: <EditShipPage />, // Добавлено
      },
      {
        path: "*",
        element: <ShipListPage />,
      },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
