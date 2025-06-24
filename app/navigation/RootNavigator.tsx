import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import AuthNavigator from './AuthNavigator';
import EventNavigator from './EventNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useAuthStore((state: any) => state.isLoggedIn);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Event" component={EventNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
