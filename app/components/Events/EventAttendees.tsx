import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';

interface Attendee {
  id: string;
  name: string;
}

interface EventAttendeesProps {
  attendees: Attendee[];
}

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const EventAttendees: React.FC<EventAttendeesProps> = ({ attendees }) => {
  const theme = useThemeStore(state => state.theme);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Attendees:</Text>
      <View style={styles.bubbles}>
        {attendees.map(a => (
          <LinearGradient
            key={a.id}
            colors={['#8E2DE2', '#4A00E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bubble}
          >
            <Text style={styles.initials}>{getInitials(a.name)}</Text>
          </LinearGradient>
        ))}
      </View>
      <Text style={styles.count}>{attendees.length} live</Text>
    </View>
  );
};

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
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  initials: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  count: {
    color: '#14b8a6',
    fontWeight: 'bold',
  },
});
