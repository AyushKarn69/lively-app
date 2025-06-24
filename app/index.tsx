import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { apolloClient } from './graphql/client';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RootNavigator />
    </ApolloProvider>
  );
}



