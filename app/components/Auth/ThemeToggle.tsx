import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';

const THEME_KEY = 'hypespace_theme';

const ThemeToggle = () => {
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);

  useEffect(() => {
    // Load theme from AsyncStorage on mount
    AsyncStorage.getItem(THEME_KEY).then(storedTheme => {
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
      }
    });
  }, [setTheme]);

  const handleToggle = () => {
    toggleTheme();
    AsyncStorage.setItem(THEME_KEY, theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{theme === 'light' ? '🌞' : '🌙'}</Text>
      <Switch value={theme === 'dark'} onValueChange={handleToggle} />
    </View>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  label: {
    marginRight: 8,
    fontSize: 18,
  },
});
