import {ApolloClient} from '@apollo/client'
import {OperationVariables} from '@apollo/client/core/types'
import {TypedDocumentNode} from '@graphql-typed-document-node/core'
import {DocumentNode} from 'graphql'

export const createApolloQuery =
  <TVariables = OperationVariables, TData = any>
  (query: DocumentNode | TypedDocumentNode<TData, TVariables>) =>
    <TCacheShape>(client: ApolloClient<TCacheShape>) => (variables: TVariables) => {
      return client.query<TData, TVariables>({query, variables})
    }
