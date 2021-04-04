module.exports = {
  root: true,

  parser: 'babel-eslint',

  plugins: ['jsx-a11y', 'react', 'react-hooks'],

  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        path: ['.'],
      },
    }
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  rules: {
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
  },

  ignorePatterns: [
    'node_modules/',
    'storybook-static',
  ]
}
