import { RouteObject } from 'react-router-dom';
import { ProtectedRoutes } from '@component/ProtectedRoutes/ProtectedRoutes';
import { HomePage } from '@page/common/HomePage';
import { NotFoundPage } from '@page/common/NotFoundPage/NotFoundPage';
import { Suspense } from 'react';
import { Skeleton } from '@mantine/core';
import { lazyWithReload } from '@helper/lazyWithReload';
import AccountCreatePage from '@page/common/AccountPage/create/AccountCreatePage';
import AccountDetailPage from '@page/common/AccountPage/detail/AccountDetailPage';
import AccountCreateGroupPage from '@page/common/AccountPage/create/AccountCreateGroupPage';
import NewsCreatePage from '@page/common/NewsPage/create/NewsCreatePage';
const DashboardPage = lazyWithReload(() => import('@page/common/DashboardPage/DashboardPage'));
const LoginPage = lazyWithReload(() => import('@page/auth/LoginPage/LoginPage'));
const SignUpPage = lazyWithReload(() => import('@page/auth/SignUpPage/SignUpPage'));
const NewsPage = lazyWithReload(() => import('@page/common/NewsPage/NewsPage'));
const AccountPage = lazyWithReload(() => import('@page/common/AccountPage/AccountPage'));
// exams
const ExamSystemPage = lazyWithReload(() => import('@page/common/ExamPage/system_exam/SystemExam'));
const ExamDesignPage = lazyWithReload(() => import('@page/common/ExamPage/design_exam/DesignExam'));
const ExamCreatePage = lazyWithReload(() => import('@page/common/ExamPage/create/ExamCreatePage'));

// dictionary
const DictionaryPage = lazyWithReload(() => import('@page/common/DictionaryPage/DictionaryPage'));
const DictionaryCreatePage = lazyWithReload(() => import('@page/common/DictionaryPage/create/DictionaryCreatePage'));

// chat bot
const ChatbotPage = lazyWithReload(() => import('@page/common/ChatbotPage/ChatbotPage'));

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
    element: (
      <LoadingWrapper>
        <LoginPage />
      </LoadingWrapper>
    ),
  },
  {
    path: '/signup',
    element: (
      <LoadingWrapper>
        <SignUpPage />
      </LoadingWrapper>
    ),
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
            path: '/accounts/create',
            element: (
              <LoadingWrapper>
                <AccountCreatePage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/accounts/create/group',
            element: (
              <LoadingWrapper>
                <AccountCreateGroupPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/accounts/view',
            element: (
              <LoadingWrapper>
                <AccountDetailPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/system',
            element: (
              <LoadingWrapper>
                <ExamSystemPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/system/create/:allQuestionType',
            element: (
              <LoadingWrapper>
                <ExamCreatePage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/design',
            element: (
              <LoadingWrapper>
                <ExamDesignPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/design/create/:allQuestionType',
            element: (
              <LoadingWrapper>
                <ExamCreatePage />
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
            path: '/news/create',
            element: (
              <LoadingWrapper>
                <NewsCreatePage />
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
            path: '/dictionary/create',
            element: (
              <LoadingWrapper>
                <DictionaryCreatePage />
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
