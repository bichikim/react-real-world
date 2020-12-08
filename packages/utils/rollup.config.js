import {snakeCase} from 'lodash'
import {getEsBuildConfig} from '../../rollup.config'
import package_ from './package.json'

const name = snakeCase(package_.name)
const external = Object.keys(package_.dependencies)

const alias = [{find: 'assets', replacement: 'assets'}]

const configs = [
  getEsBuildConfig({alias, external, minify: true, name, output: 'index.js'}),
  getEsBuildConfig({alias, external, format: 'iife', minify: true, name, output: 'index.iife.js'}),
]

export default configs
