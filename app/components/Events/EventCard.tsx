import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserGroupIcon } from 'react-native-heroicons/outline';

interface EventCardProps {
  event: {
    id: string;
    name: string;
    location: string;
    startTime: string;
    joined: boolean;
    attendees: number;
  };
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.name}>{event.name}</Text>
    <Text style={styles.location}>{event.location}</Text>
    <Text style={styles.time}>{new Date(event.startTime).toLocaleString()}</Text>
    <View style={styles.row}>
      <Text style={{ color: event.joined ? 'green' : 'red', fontWeight: 'bold' }}>  
        {event.joined ? 'Joined' : 'Join'}
      </Text>
      <View style={[styles.badge, { flexDirection: 'row', alignItems: 'center' }]}>
        <UserGroupIcon color="#3730a3" size={18} style={{ marginRight: 4 }} />
        <Text style={styles.badgeText}>{event.attendees}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default EventCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  time: {
    fontSize: 13,
    color: '#6366f1',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  join: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  badge: {
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 13,
    color: '#3730a3',
  },
});
