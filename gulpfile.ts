import {parallel, series} from 'gulp'
import * as execa from 'gulp-execa'
// noinspection ES6PreferShortImport
import {createCopy} from './scripts/copy'
// noinspection ES6PreferShortImport
import {createTtscTask} from './scripts/ttsc'
// noinspection ES6PreferShortImport
import {createRemoveTask} from './scripts/remove'
// noinspection ES6PreferShortImport
import {createEslintTask} from './scripts/eslint'

const DEFAULT_DIST_DIRECTORY = 'lib'
const DEFAULT_SOURCE_DIRECTORY = 'src'
const DEFAULT_TARGET = 'es2017'
const DEFAULT_TS_PROJECT = 'tsconfig.bundle.json'
const DEFAULT_TS_MODULE = 'es2020'

export const rollup = execa.task('rollup -c')

export const format =  createEslintTask(true)

export const lint = createEslintTask(false)

export const build: any = series(
  createRemoveTask(DEFAULT_DIST_DIRECTORY),
  createTtscTask({
    dist: DEFAULT_DIST_DIRECTORY,
    emitDeclarationOnly: false,
    module: DEFAULT_TS_MODULE,
    project: DEFAULT_TS_PROJECT,
    target: DEFAULT_TARGET,
  }),
  createCopy({
    dist: DEFAULT_DIST_DIRECTORY,
    source: DEFAULT_SOURCE_DIRECTORY,
    target: 'assets',
    watch: false,
  }),
)
export const dev: any = parallel(
  createCopy({
    dist: DEFAULT_DIST_DIRECTORY,
    source: DEFAULT_SOURCE_DIRECTORY,
    target: 'assets',
    watch: true,
  }),
  createTtscTask({
    dist: DEFAULT_DIST_DIRECTORY,
    emitDeclarationOnly: false,
    module: DEFAULT_TS_MODULE,
    project: DEFAULT_TS_PROJECT,
    target: DEFAULT_TARGET,
    watch: true,
  }),
)
