import { accessTokenAtom } from 'atoms/auth.store';
import { ROUTES } from 'constants/routes.constants';
import { useAtom } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoutes() {
  const [accessToken] = useAtom(accessTokenAtom);

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
}
