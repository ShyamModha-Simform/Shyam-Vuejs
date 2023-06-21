/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        // Required for certain syntax usages
        ecmaVersion: 2020,
    },
    plugins: ['eslint-plugin-json', 'import'],
};
