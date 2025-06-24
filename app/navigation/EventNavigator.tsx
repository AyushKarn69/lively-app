import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventListScreen from '../screens/EventListScreen';

const Stack = createNativeStackNavigator();

export default function EventNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventList" component={EventListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
