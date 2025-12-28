import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
  ...next.coreWebVitals,

  // Ignore build & system files
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),

  {
    rules: {
      // Allow console in dev
      "no-console": "off",

      // Prevent unused vars error in dev
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // React specific
      "react/react-in-jsx-scope": "off",

      // Next.js specific
      "@next/next/no-img-element": "off",
    },
  },
]);
