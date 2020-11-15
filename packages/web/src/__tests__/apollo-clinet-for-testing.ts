import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client'
import {FC, createElement as h} from 'react'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
    watchQuery: {
      errorPolicy: 'ignore',
      fetchPolicy: 'no-cache',
    },
  },
  link: createHttpLink({
    uri: 'http://localhost:9090',
  }),
})

export const ApolloTextProvider: FC = ({children}) => {
  return (
    h(ApolloProvider, {client}, children)
  )
}
