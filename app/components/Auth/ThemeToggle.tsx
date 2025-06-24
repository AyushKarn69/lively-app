import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';

const ThemeToggle = () => {
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{theme === 'light' ? '🌞' : '🌙'}</Text>
      <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
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
