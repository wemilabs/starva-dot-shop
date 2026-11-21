"use client";

import { THEME_COLORS } from "@starva/lib/constants";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    const color = THEME_COLORS[resolvedTheme];
    for (const meta of document.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]',
    )) {
      meta.content = color;
    }
  }, [resolvedTheme]);

  return null;
}
