const config = require('../../babel.config')
module.exports = {
  ...config,
  presets: [
    'next/babel', '@emotion/babel-preset-css-prop',
  ],
}
