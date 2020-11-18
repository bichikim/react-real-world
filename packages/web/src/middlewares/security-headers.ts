import {Middleware} from 'src/middleware'

const securityHeaders: Middleware = (context) => {
  const {res} = context

  // host service will add this
  // res.setHeader('Content-Type', 'text/html')

  // https://developer.mozilla.org/en-us/docs/Web/HTTP/Headers/X-Frame-Options
  // res.setHeader('X-frame-options', 'SAMEORIGIN') // one of DENY | SAMEORIGIN | ALLOW-FROM
  // https://example.com
  res.setHeader('X-frame-options', 'SAMEORIGIN')

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
  // iE only others already protect XSS
  res.setHeader('X-XSS-Protection', 1)

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  res.setHeader('X-Content-Type-Options', 'nosniff')

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  res.setHeader('X-DNS-Prefetch-Control', 'off') // may be slower, but stops some leaks
}

export default securityHeaders
