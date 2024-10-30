import { logoutAPI } from '@api/services/auth/auth.api';
import { onError } from '@helper/error.helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accessTokenAtom, userInfoAtom } from 'atoms/auth.store';
import { ROUTES } from 'constants/routes.constants';
import { useAtom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const setUserInfo = useSetAtom(userInfoAtom);

  const reset = () => {
    setAccessToken(null);
    setUserInfo(null);
    queryClient.removeQueries();
    queryClient.clear();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const { mutate: logoutMutation, isPending: isLoading } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess: reset,
    onError,
  });

  const handleLogout = async () => {
    logoutMutation();
  };

  return { handleLogout, isLoading };
};
export default useLogout;
