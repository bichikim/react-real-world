import * as execa from 'gulp-execa'

const eslint = (fix: boolean = false) => {
  const fixString = fix ? '--fix' : ''
  return `eslint${fix ? ' ' : ''}${fixString} --ext .ts src/**/*.{js,ts,jsx,tsx} *.js`
}

export const format = execa.task(eslint(true))

export const lint = execa.task(eslint(false))

