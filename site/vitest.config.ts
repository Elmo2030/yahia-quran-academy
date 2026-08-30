import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  // Component tests contain JSX; without the react plugin esbuild leaves the
  // classic transform in place and every render() dies on "React is not defined".
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    // Component tests are written as .tsx; without the tsx globs below they
    // were silently collected by nothing and never ran. They also need a DOM,
    // hence the per-directory jsdom override.
    environmentMatchGlobs: [["client/src/**", "jsdom"]],
    setupFiles: ["client/src/test-setup.ts"],
    include: [
      "server/**/*.test.{ts,tsx}",
      "server/**/*.spec.{ts,tsx}",
      "client/src/**/*.test.{ts,tsx}",
      "client/src/**/*.spec.{ts,tsx}",
    ],
  },
});
