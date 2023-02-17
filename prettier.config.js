module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  htmlWhitespaceSensitivity: 'ignore',
  singleQuote: true,
  printWidth: 120,
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.template.html', '*.component.html'],
      options: { parser: 'angular' },
    },
    {
      files: '*.scss',
      order: 'concentric-css',
    },
  ],
};
