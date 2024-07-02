import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-requiring-type-checking",
  "prettier",
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json"
    }
  },
  { languageOptions: { globals: globals.browser } },
];
