module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: true,
            },
          },
        ],
      ],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          api: './api',
          src: './src',
        },
        cwd: 'packagejson',
        loglevel: 'info',
      },
    ],
    ['@babel/plugin-transform-react-jsx'],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        // for tree shaking
        modules: false,
        targets: {
          node: true,
        },
      },
    ],
    ['@babel/preset-typescript', {
      allExtensions: true,
      isTSX: true,
    }],
  ],
}
