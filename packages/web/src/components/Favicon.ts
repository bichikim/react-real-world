import Head from 'next/head'
import {FC, createElement as h} from 'react'

export const Favicon: FC = () => {
  return (
    h(Head, null,
      h('link', {href: '/favicon.ico', rel: 'shortcut icon'}),
      h('link', {href: '/favicon-16x16.png', rel: 'icon', type: 'image/png'}),
      h('link', {href: '/favicon-32x32.png', rel: 'icon', type: 'image/png'}),
    )
  )
}
