// eslint.config.mjs

import sortClassMembers from 'eslint-plugin-sort-class-members';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  {
    ignores: ['node_modules/**'], // Optional: Add ignored directories or files here.
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      'sort-class-members': sortClassMembers,
      jsdoc: jsdoc,
    },
    rules: {
      // Naming Conventions
      'camelcase': ['error', { properties: 'always' }],
      'no-underscore-dangle': ['error', { allow: ['_password', '_validatePassword'] }],
      'new-cap': ['error', { newIsCap: true }],
      // Layout Conventions
      'indent': ['error', 2],
      'max-len': ['error', { code: 100 }],
      'semi': ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'curly': ['error', 'all'],
      'space-infix-ops': ['error'],
      'comma-spacing': ['error', { before: false, after: true }],
      'newline-after-var': 'error',
      'eol-last': ['error', 'always'],
      // Member Order
      'sort-class-members/sort-class-members': [
        'error',
        {
          order: [
            '[static-properties]',
            '[properties]',
            'constructor',
            '[static-methods]',
            '[methods]',
            '[private-methods]',
          ],
          groups: {
            'private-methods': [
              {
                name: '/^_/',
                type: 'method',
              },
            ],
          },
        },
      ],
      // Code Comments
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
      'multiline-comment-style': ['error', 'starred-block'],
      // JSDoc Rules
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-description': 'error',
      'jsdoc/require-returns-type': 'error',
    },
  },
];
