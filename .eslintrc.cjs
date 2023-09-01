module.exports = {
  extends: '@orca-fe',
  settings: {
    'import/resolver': {
      alias: {
        map: [['@orca-fe/vite-plugin-react-convention-routes', './packages/vite-plugin-react-convention-routes/src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/consistent-type-exports': ['error'],
    'max-len': ['error', 160],
    'react/jsx-max-depth': ['off'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
