/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  ignorePatterns: [".eslintrc.*", "prettier.config.*", "vite.config.*", "commitlint.config.*"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "vue/valid-v-slot": "off"
  }
}
