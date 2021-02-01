import * as execa from 'gulp-execa'

const eslint = (fix: boolean = false) => {
  const fixString = fix ? '--fix' : ''
  return `eslint${fix ? ' ' : ''}${fixString} --ext .ts src/**/*.{js,ts,jsx,tsx} *.js`
}

export const createEslintTask = (fix: boolean = false) => execa.task(eslint(fix))

