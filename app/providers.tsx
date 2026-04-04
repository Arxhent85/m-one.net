"use client";

import React from "react";
import { LanguageProvider } from "../components/LanguageContext";
import { ThemeProvider } from "../components/ThemeContext";
import { NavigationProvider } from "../components/NavigationContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
