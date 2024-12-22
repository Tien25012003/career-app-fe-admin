import { ProtectedRoutes } from '@component/ProtectedRoutes/ProtectedRoutes';
import { lazyWithReload } from '@helper/lazyWithReload';
import { Skeleton } from '@mantine/core';
import AccountCreateGroupPage from '@page/common/AccountPage/create/AccountCreateGroupPage';
import AccountCreatePage from '@page/common/AccountPage/create/AccountCreatePage';
import AccountDetailPage from '@page/common/AccountPage/detail/AccountDetailPage';
import GroupEditPage from '@page/common/AccountPage/edit/GroupEditPage';
import { HomePage } from '@page/common/HomePage';
import NewsCreatePage from '@page/common/NewsPage/create/NewsCreatePage';
import { NotFoundPage } from '@page/common/NotFoundPage/NotFoundPage';
import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
const DashboardPage = lazyWithReload(() => import('@page/common/DashboardPage/DashboardPage'));
const LoginPage = lazyWithReload(() => import('@page/auth/LoginPage/LoginPage'));
const ForgotPasswordPage = lazyWithReload(() => import('@page/auth/ForgotPasswordPage/ForgotPasswordPage'));
const SignUpPage = lazyWithReload(() => import('@page/auth/SignUpPage/SignUpPage'));
const NewsPage = lazyWithReload(() => import('@page/common/NewsPage/NewsPage'));
//Account
const AccountPage = lazyWithReload(() => import('@page/common/AccountPage/AccountPage'));
const GroupDetailPage = lazyWithReload(() => import('@page/common/AccountPage/detail/GroupDetailPage'));
const AccountEditPage = lazyWithReload(() => import('@page/common/AccountPage/edit/AccountEditPage'));

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
    path: '/forgot-password',
    element: (
      <LoadingWrapper>
        <ForgotPasswordPage />
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
            path: '/accounts/edit/:id',
            element: (
              <LoadingWrapper>
                <AccountEditPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/accounts/group/create',
            element: (
              <LoadingWrapper>
                <AccountCreateGroupPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/accounts/group/edit/:id',
            element: (
              <LoadingWrapper>
                <GroupEditPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/accounts/group/view/:id',
            element: (
              <LoadingWrapper>
                <GroupDetailPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/accounts/view/:id',
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
            path: '/exams/system/:id/:allQuestionType',
            element: (
              <LoadingWrapper>
                <ExamCreatePage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/design/:id/:allQuestionType',
            element: (
              <LoadingWrapper>
                <ExamCreatePage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/system/edit/:id/:allQuestionType',
            element: (
              <LoadingWrapper>
                <ExamCreatePage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/design/edit/:id/:allQuestionType',
            element: (
              <LoadingWrapper>
                <ExamCreatePage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/system/subjects',
            element: (
              <LoadingWrapper>
                <ExamSystemPage />
              </LoadingWrapper>
            ),
          },
          {
            path: '/exams/system/conclusion',
            element: (
              <LoadingWrapper>
                <ExamSystemPage />
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
