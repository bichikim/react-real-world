import {Middleware} from 'src/middleware'

const cookie: Middleware = (context) => {
  const {res} = context
  res.setHeader('Set-Cookie', 'SameSite=Strict')
}

export default cookie
