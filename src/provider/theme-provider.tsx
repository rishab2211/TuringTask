"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <NextTopLoader color="#7540A9" height={4} showSpinner={false} />
      {children}
    </NextThemesProvider>
  );
}
