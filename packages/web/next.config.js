const path = require('path')
const images = require('next-images')
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')

const transpileModules = require('next-transpile-modules')([
  'lodash-es',
  'api',
])

const config = withPlugins([images, transpileModules, bundleAnalyzer], {
  env: {
  },
  webpack(config, {defaultLoaders}) {
    // fix for trying load .md fire in middlewares and boot
    config.module.noParse = /.md$/

    if (!defaultLoaders.babel.options.plugins) {
      defaultLoaders.babel.options.plugins = []
    }

    // alias
    config.resolve.alias['src'] = path.resolve(__dirname, 'src')
    config.resolve.alias['api'] = path.resolve(__dirname, 'api')
    config.resolve.alias['assets'] = path.resolve(__dirname, 'src/assets')

    return config
  },
})

module.exports = config
