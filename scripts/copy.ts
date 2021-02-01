import fs from 'fs'
import path from 'path'
import {watch} from 'gulp'
import * as execa from 'gulp-execa'

export interface CpyOptions {
  cwd?: string
  dist?: string
  glob?: string
  source?: string
  target?: string
  watch?: boolean
}

export const createCopy = (options: CpyOptions = {}) => {
  const {
    source = 'src',
    dist = 'lib',
    target,
    glob = '**/*',
    cwd = process.cwd(),
    watch: _watch = false,
  } = options

  if (!target) {
    return () => Promise.resolve()
  }

  const targetPath = `${source}/${target}`

  const existsAsset = fs.existsSync(path.resolve(cwd, targetPath))

  if (!existsAsset) {
    return () => Promise.resolve()
  }

  const task = execa.task(`cpy ./${glob} !./**/*.{ts,tsx} ../../${dist}/${target} --parents --cwd=${targetPath}`)

  if (_watch) {
    return () => {
      task()
      return watch([`${source}/${target}/${glob}`], task)
    }
  }

  return task
}
