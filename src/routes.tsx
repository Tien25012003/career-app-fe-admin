import { RouteObject } from "react-router-dom";
import { ProtectedRoutes } from "@component/ProtectedRoutes/ProtectedRoutes";
import { HomePage } from "@page/common/HomePage";
import { DashboardPage } from "@page/common/DashboardPage";
import { LoginPage } from "@page/auth/LoginPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
];

export const routes = [...publicRoutes, ...privateRoutes];
//export const routes = [];
