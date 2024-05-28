module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'detox', 'unused-imports', 'prettier', 'react-hooks'],
  ignorePatterns: ['*.config.js'],
  rules: {
    'no-catch-shadow': 0,
    'react-native/no-inline-styles': 0,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  overrides: [
    {
      files: ['*.e2e.ts', 'e2e/init.ts'],
      env: {
        'jest/globals': true,
      },
    },
  ],
}
