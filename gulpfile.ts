import * as execa from 'gulp-execa'
import {parallel, watch} from 'gulp'

export interface TTscOptions {
  emitDeclarationOnly?: boolean
  project?: string
  watch?: boolean
}

const eslint = (fix: boolean = false) => {
  const fixString = fix ? '--fix' : ''
  return `eslint${fix ? ' ' : ''}${fixString} --ext .ts src/**/*.{js,ts,jsx,tsx} *.js`
}

export const ttsc = (options: TTscOptions = {}) => {
  const {watch, emitDeclarationOnly, project} = options

  const script = ['ttsc --assumeChangesOnlyAffectDirectDependencies']

  if (watch) {
    script.push('--watch')
  }

  if (emitDeclarationOnly) {
    script.push('--emitDeclarationOnly')
  }

  if (project) {
    script.push(`--project ${project}`)
  }

  return script.join(' ')
}

export interface CpyOptions {
  dist?: string
  glob?: string
  source?: string
  target?: string
  watch?: boolean
}

export const createCopy = (options: CpyOptions = {}) => {
  const {source, dist, target, glob = '**/*', watch: _watch = false} = options

  if (!source || !dist || !target) {
    return () => Promise.resolve()
  }

  const task = execa.task(`cpy ./${glob} !./**/*.{ts,tsx} ../../${dist}/${target} --parents --cwd=${source}/${target}`)

  if (_watch) {
    return () => {
      task()
      return watch([`${source}/${target}/${glob}`], task)
    }
  }

  return task
}

export const createTTsc = (options?: TTscOptions) => execa.task(ttsc(options))

export const rollup = execa.task('rollup -c')

export const format = execa.task(eslint(true))

export const lint = execa.task(eslint(false))

export const build: any = parallel(rollup, createTTsc({
  emitDeclarationOnly: true,
  project: 'tsconfig.bundle.json',
  watch: false,
}))

export const dev: any = parallel(
  createCopy({
    dist: 'lib',
    source: 'src',
    target: 'assets',
    watch: true,
  }),
  createTTsc({
    emitDeclarationOnly: false,
    project: 'tsconfig.bundle.json',
    watch: true,
  }),
)
