import { RouteObject } from 'react-router-dom';
import { ProtectedRoutes } from '@component/ProtectedRoutes/ProtectedRoutes';
import { HomePage } from '@page/common/HomePage';
import { NotFoundPage } from '@page/common/NotFoundPage/NotFoundPage';
import { Suspense } from 'react';
import { Skeleton } from '@mantine/core';
import { lazyWithReload } from '@helper/lazyWithReload';
const DashboardPage = lazyWithReload(() => import('@page/common/DashboardPage/DashboardPage'));
const LoginPage = lazyWithReload(() => import('@page/auth/LoginPage/LoginPage'));
const NewsPage = lazyWithReload(() => import('@page/common/NewsPage/NewsPage'));
const AccountPage = lazyWithReload(() => import('@page/common/AccountPage/AccountPage'));
const ExamPage = lazyWithReload(() => import('@page/common/ExamPage/ExamPage'));
const DictionaryPage = lazyWithReload(() => import('@page/common/DictionaryPage/DictionaryPage'));
const ChatbotPage = lazyWithReload(() => import('pages/common/ChatbotPage/ChatbotPage'));

export const LoadingWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <>
        <Skeleton animate />
        <Skeleton animate />
      </>
    }
  >
    {children}
  </Suspense>
);

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            index: true,
            element: (
              <LoadingWrapper>
                <DashboardPage />
              </LoadingWrapper>
            ),
          },

          {
            path: '/accounts',
            element: (
              <LoadingWrapper>
                <AccountPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams',
            element: (
              <LoadingWrapper>
                <ExamPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/news',
            element: (
              <LoadingWrapper>
                <NewsPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/chatbot',
            element: (
              <LoadingWrapper>
                <ChatbotPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/dictionary',
            element: (
              <LoadingWrapper>
                <DictionaryPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
];

export const routes = [...publicRoutes, ...privateRoutes];
//export const routes = [];
