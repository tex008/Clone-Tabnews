import js from "@eslint/js";
import nextConfig from "eslint-config-next";
import jestPlugin from "eslint-plugin-jest";
import prettierConfig from "eslint-config-prettier";

const config = [
  js.configs.recommended,
  ...nextConfig,
  {
    files: ["tests/**/*.js"],
    ...jestPlugin.configs["flat/recommended"],
  },
  prettierConfig,
  {
    rules: {
      "no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
    },
  },
];

export default config;
