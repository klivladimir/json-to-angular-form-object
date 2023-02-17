module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    es2017: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', '@angular-eslint', 'prettier', 'unused-imports', 'import', 'simple-import-sort'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended',
        'prettier',
      ],
      parserOptions: {
        project: ['tsconfig.json', '.src/tsconfig.*?*.json'],
        createDefaultProgram: true,
      },
      rules: {
        '@angular-eslint/component-class-suffix': [
          'error',
          {
            suffixes: ['Page', 'Component'],
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'rxjs/operators',
                message: "Please use 'rxjs' instead.",
              },
            ],
          },
        ],
        "@typescript-eslint/lines-between-class-members": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        'prettier/prettier': ['error'],
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/consistent-type-imports': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
      },
    },
    {
      files: ['*.component.html'],
      plugins: ['@angular-eslint/template'],
      extends: ['plugin:@angular-eslint/template/recommended', 'prettier'],
      rules: {
        'prettier/prettier': ['error'],
      },
    },
  ],
};
