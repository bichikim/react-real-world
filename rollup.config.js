import path from 'path'
import {terser} from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'

const customResolver = resolve({
  extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.ts', '.tsx'],
})

const defaultOptions = (options = {}) => {
  const {
    output,
    sourceDirectory = 'src',
    format = 'esm',
    name,
    external = [],
    minify = false,
    outDirectory = 'lib',
    projectRootDir,
    alias = [],
    globals = {},
  } = options

  const outFile = [outDirectory, output].join('/')

  return {
    alias,
    external,
    format,
    globals,
    minify,
    name,
    outDirectory,
    outFile,
    output,
    projectRootDir,
    sourceDirectory,
  }
}

const createRollupBasisConfig = (options = {}) => {
  const {
    alias: _alias,
    minify,
    external,
    format,
    sourceDirectory,
    name,
    globals,
    outFile,
  } = options

  return {
    external,
    input: `${sourceDirectory}/index.ts`,
    output: {
      file: outFile,
      format,
      globals: {
        ...globals,
      },
      name,
      plugins: minify ? [terser()] : [],
      sourcemap: true,
    },
    plugins: [
      customResolver,
      alias({
        customResolver,
        entries: [
          {find: '@', replacement: path.resolve(process.cwd(), sourceDirectory)},
          {find: 'src', replacement: path.resolve(process.cwd(), sourceDirectory)},
          ..._alias,
        ],
      }),
    ],
  }
}

export const getEsBuildConfig = (options = {}) => {
  const _options = defaultOptions(options)

  const {minify} = _options

  const config =  createRollupBasisConfig(_options)

  config.plugins.push(
    esbuild({

      // like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },

      // default, or 'es20XX', 'esnext'
      jsxFactory: 'React.createElement',

      jsxFragment: 'React.Fragment',

      // add extra loaders
      loaders: {

        // enable JSX in .js files too
        '.js': 'jsx',

        // add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
      },

      // default
      minify,
      // all options are optional
      // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      // exclude: /node_modules/, // default
      sourceMap: false,
      target: 'es2017',
    }),
  )

  return config
}
