module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  babelrcRoots: ['.', 'client/'],
  plugins: ['@babel/plugin-proposal-class-properties']
};
