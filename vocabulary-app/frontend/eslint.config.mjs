import js from "@eslint/js";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**"
    ]
  },
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  }
];
