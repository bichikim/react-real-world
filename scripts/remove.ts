import * as execa from 'gulp-execa'

const remove = (dist: string) => `rimraf ./${dist}`

export const createRemoveTask = (dist: string) => execa.task(remove(dist))
