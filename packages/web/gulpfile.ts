import {config, stream} from 'favicons'
import {dest, src} from 'gulp'
export {format, lint} from '../../gulpfile'

if (!config.icons) {
  config.icons = {}
}

if (!config.icons.favicons) {
  config.icons.favicons = {}
}

config.icons.favicons['favicon-128x128.png'] = {
  height: 128,
  mask: false,
  rotate: false,
  transparent: true,
  width: 128,
}

config.icons.favicons['favicon-96x96.png'] = {
  height: 128,
  mask: false,
  rotate: false,
  transparent: true,
  width: 128,
}

// fix a favicons 'undefined member' error
delete config.icons.favicons['favicon-48x48.png']

export const favicons = () => src('./media/favicon.png').pipe(stream({
  appDescription: 'web page',
  appName: 'web',
  appShortName: 'web',
} as any))
  .on('error', console.error)
  .pipe(dest('./public'))
