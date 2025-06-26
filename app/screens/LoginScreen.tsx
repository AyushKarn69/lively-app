import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import BrandingHeader from '../components/Auth/BrandingHeader';
import ThemeToggle from '../components/Auth/ThemeToggle';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

export default function LoginScreen() {
  const login = useAuthStore((state: any) => state.login);
  const theme = useThemeStore(state => state.theme);

  const handleLogin = () => {
    login();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <BrandingHeader />
        <Button title="Login" onPress={handleLogin} color="#4f46e5" />
        <ThemeToggle />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#27272a',
    borderColor: '#52525b',
    color: '#fff',
  },
  text: {
    // Add any necessary styles for the Text component
  },
});
