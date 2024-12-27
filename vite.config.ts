/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { UserConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()] as UserConfig["plugins"],
  test: {
    include: ["src/**/*.spec.ts", "src/**/*.test.tsx"],
  },
});
