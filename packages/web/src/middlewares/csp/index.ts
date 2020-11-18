import contentSecurity from 'content-security-policy-builder'
import {Middleware} from 'src/middleware'
import {apiUrl} from 'src/env'
import {v4 as uuidv4} from 'uuid'
import {policies} from './policies'

const nonce = Buffer.from(uuidv4()).toString('base64')

const csp = contentSecurity(policies({apiUrl: apiUrl(), nonce}))

const cspMiddleware: Middleware = (context) => {
  const {res} = context

  res.setHeader('Content-Security-Policy', csp)

  return {
    nonce,
  }
}

export default cspMiddleware
