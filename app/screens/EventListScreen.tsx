import { gql, useQuery } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeToggle from '../components/Auth/ThemeToggle';
import EventCard from '../components/Events/EventCard';
import { useThemeStore } from '../store/useThemeStore';

const EVENTS_QUERY = gql`
  query {
    events {
      id
      name
      location
      startTime
      attendees { id name }
    }
  }
`;

function formatEventDate(startTime: any) {
  const dateObj =
    typeof startTime === 'number'
      ? new Date(startTime)
      : typeof startTime === 'string'
      ? new Date(Number(startTime))
      : null;
  const isValidDate = dateObj instanceof Date && !isNaN(dateObj.getTime());
  return isValidDate
    ? dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : 'No date';
}

const CURRENT_USER_NAME = 'Alice Johnson'; // or use id if available

export default function EventListScreen({ navigation }: any) {
  const { data, loading, error, refetch } = useQuery(EVENTS_QUERY);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useThemeStore(state => state.theme);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const backgroundColor = theme === 'dark' ? '#18181b' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#000';

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: textColor, flex: 1 }]}>Upcoming Events</Text>
          <ThemeToggle />
        </View>
        <FlatList
          data={data.events}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const joined = item.attendees.some((a: any) => a.name === CURRENT_USER_NAME);
            return (
              <EventCard
                event={{
                  id: item.id,
                  name: item.name,
                  location: item.location,
                  startTime: formatEventDate(item.startTime),
                  joined,
                  attendees: item.attendees.length,
                }}
                onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
              />
            );
          }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
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
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});
