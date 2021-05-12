import {useMemo} from 'react';
import {ApolloClient, ApolloLink, from, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';

import {getCookie} from './utils';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<unknown>;

if (!process.env.NEW_API_URL) {
  throw new Error('env.NEW_API_URL not found!');
}

const getAuthMiddleware = (_token?: string) =>
  new ApolloLink((operation, forward) => {
    const token = _token ?? getCookie('accessToken');
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });

    return forward(operation);
  });

function createApolloClient(token?: string) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([
      getAuthMiddleware(token),
      createUploadLink({
        uri: process.env.NEW_API_URL,
      }),
    ]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, token?: string) {
  const _apolloClient = apolloClient ?? createApolloClient(token);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: Record<string, unknown>) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
