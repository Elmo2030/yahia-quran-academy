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
    environment: "jsdom",
    // Everything under client/ is browser code and needs a DOM. (This was
    // environmentMatchGlobs, which vitest 3 deprecates; the whole client tree
    // wants jsdom anyway, so the plain setting covers it.)
    setupFiles: ["client/src/test-setup.ts"],
    include: [
      "functions/**/*.test.{ts,tsx}",
      "supabase/**/*.test.ts",
      "server/**/*.test.{ts,tsx}",
      "server/**/*.spec.{ts,tsx}",
      "client/src/**/*.test.{ts,tsx}",
      "client/src/**/*.spec.{ts,tsx}",
    ],
  },
});
