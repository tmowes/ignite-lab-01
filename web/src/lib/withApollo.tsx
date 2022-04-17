import { GetServerSidePropsContext, NextPage } from 'next'

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

export type ApolloClientContext = GetServerSidePropsContext

export const withApollo = (Component: NextPage) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function Provider({ apolloState }: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, apolloState)}>
        <Component />
      </ApolloProvider>
    )
  }

export function getApolloClient(ctx?: ApolloClientContext, ssrCache?: NormalizedCacheObject) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/api',
    fetch,
  })

  const cache = new InMemoryCache().restore(ssrCache ?? {})

  return new ApolloClient({ link: from([httpLink]), cache })
}
