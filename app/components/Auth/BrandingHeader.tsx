import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BrandingHeader = () => (
  <View style={styles.container}>
    {/* Replace with your logo image if available */}
    <Text style={styles.logo}>📱</Text>
    <Text style={styles.title}>Hypespace</Text>
  </View>
);

export default BrandingHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#4f46e5',
    fontFamily: 'sans-serif',
  },
});
