import {Request, Response} from 'express'
import {User} from 'src/types/server'
import {ExecutionParams} from 'subscriptions-transport-ws'

export interface ContextType {
  accessToken?: string
  user?: User
}

export interface ExpressContext {
  connection?: ExecutionParams
  req: Request
  res: Response
}

export interface ContextOptions {
  accessTokenName?: string
}

const getAccessToken = (
  request: Request,
  accessTokenName: string,
) => {
  const accessToken = request.headers?.[accessTokenName]
  if (typeof accessToken === 'string') {
    return accessToken
  }
  return request.cookies?.[accessTokenName]
}

export const createContextFunction = (options: ContextOptions = {}) => (context: ExpressContext): ContextType => {

  // skip connection
  if (context.connection) {
    return context.connection.context
  }

  const {
    accessTokenName = 'access-token',
  } = options
  const {req} = context

  const accessToken = getAccessToken(req, accessTokenName)

  return {
    accessToken,
  }
}
