import { UserInfoRES } from '@api/services/auth/auth.response';
import { LOCAL_STORAGE } from 'constants/local-storage.constants';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const accessTokenAtom = atomWithStorage<string | null>(LOCAL_STORAGE.ACCESS_TOKEN, null, undefined, {
  getOnInit: true,
});
export const userInfoAtom = atom<UserInfoRES | null>(null);
