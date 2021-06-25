import {split, ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { uri, wsUri } from "./consts";

import { getMainDefinition } from '@apollo/client/utilities';

const link = new HttpLink({
  uri,
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  link,
);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: from([splitLink]),
})