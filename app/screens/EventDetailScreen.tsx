import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import EventAttendees from '../components/Events/EventAttendees';
import JoinButton from '../components/Events/JoinButton';

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
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.info}>{event.location}</Text>
      <Text style={styles.info}>
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
  );
}

const styles = StyleSheet.create({
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
