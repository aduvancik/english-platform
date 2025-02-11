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
        languageOptions: { globals: globals.node },
        plugins: {
            "@stylistic/js": stylistic,
        },
    },
    pluginJs.configs.recommended,
];
