import { ComponentType, lazy } from "react";

// force reload browser when error

export const lazyWithReload = <T extends ComponentType<unknown>>(
  dynamicImport: () => Promise<{ default: T }>
) =>
  lazy(() =>
    dynamicImport().catch((error) => {
      console.log("Error loading component:", error);
      window.location.reload();
      return new Promise<{ default: T }>(() => {});
    })
  );
