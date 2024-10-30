import { getUserInfoAPI } from '@api/services/auth/auth.api';
import { useQuery } from '@tanstack/react-query';
import { accessTokenAtom, userInfoAtom } from 'atoms/auth.store';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { ROUTES } from 'constants/routes.constants';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoutes() {
  const [accessToken] = useAtom(accessTokenAtom);
  const setUserInfo = useSetAtom(userInfoAtom);

  const { data: userInfo } = useQuery({
    queryKey: [QUERY_KEYS.ACCOUNT.USER_INFO],
    queryFn: () => getUserInfoAPI(),
    enabled: !!accessToken,
    select: ({ data }) => data,
  });

  useEffect(() => {
    if (accessToken && userInfo) {
      setUserInfo(userInfo);
    }
  }, [accessToken, setUserInfo, userInfo]);

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
}
