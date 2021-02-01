import * as execa from 'gulp-execa'

export interface TTscOptions {
  dist?: string
  emitDeclarationOnly?: boolean
  module?: string
  project?: string
  target?: string
  watch?: boolean
}

export const ttsc = (options: TTscOptions = {}) => {
  const {dist, target, watch, emitDeclarationOnly, project, module} = options

  const script = ['ttsc --assumeChangesOnlyAffectDirectDependencies']

  if (watch) {
    script.push('--watch')
  }

  if (emitDeclarationOnly) {
    script.push('--emitDeclarationOnly')
  }

  if (target) {
    script.push(`--target ${target}`)
  }

  if (module) {
    script.push(`--module ${module}`)
  }

  if (dist) {
    script.push(`--outDir ${dist}`)
  }

  if (project) {
    script.push(`--project ${project}`)
  }

  return script.join(' ')
}

export const createTtscTask =
  (options: TTscOptions = {}) =>
    execa.task(ttsc(options))

