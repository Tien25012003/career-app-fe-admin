import { RouteObject } from "react-router-dom";
import { ProtectedRoutes } from "@component/ProtectedRoutes/ProtectedRoutes";
import { HomePage } from "@page/common/HomePage";
import { DashboardPage } from "@page/common/DashboardPage";
import { LoginPage } from "@page/auth/LoginPage";
import { NewsPage } from "@page/common/NewsPage";
import { NotFoundPage } from "@page/common/NotFoundPage";

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
          {
            path: "/news",
            element: <NewsPage />,
          },
          {
            path: "/*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
];

export const routes = [...publicRoutes, ...privateRoutes];
//export const routes = [];
