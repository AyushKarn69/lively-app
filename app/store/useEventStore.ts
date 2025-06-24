import { create } from 'zustand';

type Event = {
  id: string;
  name: string;
  location: string;
  startTime: string;
  joined: boolean;
  attendees: number;
};

type EventState = {
  events: Event[];
  setEvents: (events: Event[]) => void;
};

export const useEventStore = create<EventState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));
