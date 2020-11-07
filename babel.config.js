module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            // for tree shaking
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
          'src': './src',
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
      },
    ],
    ['@babel/preset-typescript', {
      allExtensions: true,
      isTSX: true,
    }],
  ],
}
