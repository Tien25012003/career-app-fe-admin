import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const hideNavbarAtom = atom(false);
export const miniNavbarAtom = atomWithStorage("mini-navbar", false, undefined, {
  getOnInit: true,
});

export const colorSchemeAtom = atomWithStorage<"light" | "dark">(
  "color-scheme",
  "light",
  undefined,
  {
    getOnInit: true,
  }
);
