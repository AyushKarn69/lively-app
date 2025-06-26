import { ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { apolloClient } from './graphql/client';
import RootNavigator from './navigation/RootNavigator';
import { useThemeStore } from './store/useThemeStore';

const THEME_KEY = 'hypespace_theme';

export default function App() {
  const setTheme = useThemeStore(state => state.setTheme);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then(storedTheme => {
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
      }
    });
  }, [setTheme]);

  return (
    <ApolloProvider client={apolloClient}>
      <RootNavigator />
    </ApolloProvider>
  );
}



