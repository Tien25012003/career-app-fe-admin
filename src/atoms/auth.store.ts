import { IAccount } from '@interface/account';
import { LOCAL_STORAGE } from 'constants/local-storage.constants';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const accessTokenAtom = atomWithStorage<string | null>(LOCAL_STORAGE.ACCESS_TOKEN, null, undefined, {
  getOnInit: true,
});
//export const userInfoAtom = atom<IAccount | null>(null);
