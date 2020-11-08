const {resolve} = require('path')
const withImages = require('next-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


const withTM = require('next-transpile-modules')([
  'lodash-es',
  'api',
])

const config = withBundleAnalyzer(withImages({
  env: {
  },
  webpack(config, {defaultLoaders}) {
    // fix for trying load .md fire in middleware and boot
    config.module.noParse = /.md$/

    if (!defaultLoaders.babel.options.plugins) {
      defaultLoaders.babel.options.plugins = []
    }
    // tree-shacking helper
    defaultLoaders.babel.options.plugins.push(['import', {
      'libraryName': 'antd',
      'style': true,
    }])

    // alias
    config.resolve.alias['src'] = resolve(__dirname, 'src')
    config.resolve.alias['api'] = resolve(__dirname, 'api')
    config.resolve.alias['assets'] = resolve(__dirname, 'src/assets')

    return config
  },
}))

module.exports = withTM(config)
