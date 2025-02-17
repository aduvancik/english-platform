import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
    stylistic.configs.customize({
        arrowParens: false,
        blockSpacing: true,
        braceStyle: "1tbs",
        commaDangle: "always-multiline",
        indent: 4,
        jsx: false,
        quoteProps: "consistent-as-needed",
        quotes: "double",
        semi: true,
    }),
    {
        files: ["src/**/*"],
        languageOptions: { globals: globals.node },
        plugins: {
            "@stylistic/js": stylistic,
        },
    },
    {
        files: ["src/middlewares/*.js"],
        languageOptions: { globals: globals.node },
        plugins: {
            "@stylistic/js": stylistic,
        },
        rules: {
            "no-unused-vars": ["error", {
                args: "none",
            }],
        },
    },
    pluginJs.configs.recommended,
];
