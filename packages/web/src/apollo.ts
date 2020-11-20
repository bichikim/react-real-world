import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {FC} from 'react'
import {apiUrl} from 'src/env'

/**
 * fix ApolloProvider type error
 */
declare module '@apollo/client' {
  export interface ApolloProviderProps<TCache> {
    client: ApolloClient<TCache>
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  export const ApolloProvider: FC<ApolloProviderProps<any>>
}

export const createClient = (uri: string) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri,
    }),
    ssrMode: true,
  })
}

/**
 *
 */
export const client = createClient(apiUrl())
