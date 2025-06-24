import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Update if your backend runs elsewhere
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: 'Bearer lively-secret-token', // Static token
  },
}));

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
