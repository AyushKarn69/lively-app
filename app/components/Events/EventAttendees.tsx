import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Attendee {
  id: string;
  name: string;
}

interface EventAttendeesProps {
  attendees: Attendee[];
}

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const EventAttendees: React.FC<EventAttendeesProps> = ({ attendees }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Attendees:</Text>
    <View style={styles.bubbles}>
      {attendees.map(a => (
        <View key={a.id} style={styles.bubble}>
          <Text style={styles.initials}>{getInitials(a.name)}</Text>
        </View>
      ))}
    </View>
    <Text style={styles.count}>{attendees.length} live</Text>
  </View>
);

export default EventAttendees;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bubbles: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  initials: {
    fontWeight: 'bold',
    color: '#3730a3',
    fontSize: 16,
  },
  count: {
    color: '#14b8a6',
    fontWeight: 'bold',
  },
});
