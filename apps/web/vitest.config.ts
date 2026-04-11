import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@cue/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@cue/db": path.resolve(__dirname, "../../packages/db/src"),
    },
  },
});
