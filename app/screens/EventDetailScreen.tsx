import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventAttendees from '../components/Events/EventAttendees';
import JoinButton from '../components/Events/JoinButton';
import { useThemeStore } from '../store/useThemeStore';

const EVENT_QUERY = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      name
      location
      startTime
      attendees { id name }
    }
  }
`;

const JOIN_EVENT_MUTATION = gql`
  mutation JoinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      id
      attendees { id name }
    }
  }
`;

export default function EventDetailScreen({ route, navigation }: any) {
  const { eventId } = route.params;
  const { data, loading, error, refetch } = useQuery(EVENT_QUERY, {
    variables: { id: eventId },
    fetchPolicy: 'network-only',
  });
  const [joinEvent, { loading: joining }] = useMutation(JOIN_EVENT_MUTATION, {
    onCompleted: () => refetch(),
    onError: (err) => Alert.alert('Error', err.message),
  });
  const theme = useThemeStore(state => state.theme);
  const backgroundColor = theme === 'dark' ? '#18181b' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#000';

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data?.event) return <Text>Event not found.</Text>;

  const event = data.event;
  console.log('Event startTime:', event.startTime);

  const dateObj =
    typeof event.startTime === 'number'
      ? new Date(event.startTime)
      : typeof event.startTime === 'string'
      ? new Date(Number(event.startTime))
      : null;

  const isValidDate = dateObj instanceof Date && !isNaN(dateObj.getTime());

  const joined = event.attendees.some((a: any) => a.name === 'Alice Johnson'); // or use user id if available

  const handleJoin = () => {
    joinEvent({ variables: { eventId: event.id } });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{event.name}</Text>
        <Text style={[styles.info, { color: textColor }]}>{event.location}</Text>
        <Text style={[styles.info, { color: textColor }]}>
          {isValidDate
            ? dateObj.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : 'No date'}
        </Text>
        <JoinButton joined={joined} onJoin={handleJoin} />
        <EventAttendees attendees={event.attendees} />
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
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
});
