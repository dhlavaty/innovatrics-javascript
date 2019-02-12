module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    // We've changed minProperties from airbnb's 4 to our 8.
    // enforce line breaks between braces
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': [
      'error',
      {
        minProperties: 8,
        multiline: true,
        consistent: true
      }
    ],

    // Dusan hates this one
    'no-lonely-if': 'off',

    // we do not agree with airbnb on this
    // see this for a discussion: https://github.com/airbnb/javascript/issues/1135
    'import/prefer-default-export': 'off',

    // we need to override this one because when the object-keys
    // are numbers, then airbnb wants them unquoted, and flow
    // wants them quoted. and we cannot change it in flow.
    'quote-props': [
      'error',
      'as-needed',
      { keywords: false, unnecessary: true, numbers: true }
    ],

    // We have added Storybook .story files [Innovatrics]
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          'test.{js,jsx}', // repos with a single test file
          'test-*.{js,jsx}', // repos with multiple top-level test files
          '**/*.{test,spec}.{js,jsx}', // tests where the extension denotes that it is a test
          '**/jest.config.js', // jest config
          '**/webpack.config.js', // webpack config
          '**/webpack.config.*.js', // webpack config
          '**/rollup.config.js', // rollup config
          '**/rollup.config.*.js', // rollup config
          '**/gulpfile.js', // gulp config
          '**/gulpfile.*.js', // gulp config
          '**/Gruntfile{,.js}', // grunt config
          '**/protractor.conf.js', // protractor config
          '**/protractor.conf.*.js', // protractor config
          '**/*.story.{js,jsx}' // Storybook story files - ADDED by Innovatrics
        ],
        optionalDependencies: false
      }
    ],

    // --------------------------------------------------------------------------
    // Rules under this line are extensions over 'eslint-config-innovatrics'

    // the following rule (jsx-a11y/label-has-for),
    // is deprecated in eslint-plugin-jsx-a11y,
    // and jsx-a11y/label-has-associated-control should be used instead.
    // the airbnb-ruleset still enforces it though,
    // so we disable the obsolete one completely.
    'jsx-a11y/label-has-for': 'off',

    // the airbnb-rules say that a label has to
    // BOTH have an htmlFor attribute, and have
    // the input-element as it's child.
    // we disagree here, for us it is enough
    // if one of the two happens.
    // please note, we have to override the rule-customization,
    // that airbnb did, so we explicitly set the empty-object
    // as the second param. just setting the value to 'error'
    // is not enough.
    'jsx-a11y/label-has-associated-control': ['error', {}],

    // airbnb-config is not ready for flow yet,
    // so we override the sort-order rule
    // so that flow-type-annotations can be first
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          '/^render.+$/',
          'render'
        ]
      }
    ],

    // dusan hates this
    'react/destructuring-assignment': 'off',

    // We will not write propTypes anymore, as they will be discontinued at all by Facebook
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['.tsx'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off'
  }
};