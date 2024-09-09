/* eslint-disable no-undef */
const config = {
  arrowParens: 'always',
  bracketSameLine: true,
  endOfLine: 'lf',
  jsxSingleQuote: true,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
}

const configWithPrettier = {
  arrowParens: "always",
  bracketSpacing: true,
  insertPragma: false,
  printWidth: 120,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: true,
  overrides: [
    {
      files: ".prettierrc",
      options: { "parser": "typescript" }
    }
  ]
}

module.exports = config;
