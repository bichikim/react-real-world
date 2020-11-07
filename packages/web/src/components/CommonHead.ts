import Head from 'next/head'
import {createElement as h} from 'react'

export const CommonHead = () => {
  return (
    h(Head, null,
      h('meta', {charSet: 'utf-8'}),
      h('meta', {content: 'IE=edge', 'http-equiv': 'X-UA-Compatible'}),
      h('meta', {content: 'width=device-width,initial-scale=1', name: 'viewport'}),
      h('meta', {content: '#4DBA87', name: 'theme-color'}),
      h('link', {href: '/manifest.json', rel: 'manifest'}),
    )
  )
}
