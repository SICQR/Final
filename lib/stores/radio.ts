import { create } from 'zustand';

interface RadioState {
  isPlaying: boolean;
  currentShow: Show | null;
  volume: number;
  isLive: boolean;
  listeners: number;
  currentTrack?: Track;
  schedule: Show[];
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentShow: (show: Show | null) => void;
  setCurrentTrack: (track: Track | undefined) => void;
  updateListeners: (count: number) => void;
  loadSchedule: () => void;
}

interface Show {
  id: string;
  title: string;
  host: string;
  startTime: Date;
  endTime: Date;
  description: string;
  imageUrl?: string;
  isLive?: boolean;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  artwork?: string;
}

export const useRadioStore = create<RadioState>((set, get) => ({
  isPlaying: false,
  currentShow: null,
  volume: 80,
  isLive: true,
  listeners: 247,
  currentTrack: undefined,
  schedule: [],
  
  setPlaying: (playing: boolean) => {
    set({ isPlaying: playing });
  },
  
  setVolume: (volume: number) => {
    set({ volume: Math.max(0, Math.min(100, volume)) });
  },
  
  setCurrentShow: (show: Show | null) => {
    set({ currentShow: show });
  },
  
  setCurrentTrack: (track: Track | undefined) => {
    set({ currentTrack: track });
  },
  
  updateListeners: (count: number) => {
    set({ listeners: count });
  },
  
  loadSchedule: () => {
    // Mock schedule data
    const mockSchedule: Show[] = [
      {
        id: '1',
        title: 'Morning Filth',
        host: 'DJ Cosmic',
        startTime: new Date(new Date().setHours(8, 0, 0, 0)),
        endTime: new Date(new Date().setHours(10, 0, 0, 0)),
        description: 'Start your day with the hottest beats and messiest vibes.',
        isLive: true,
      },
      {
        id: '2',
        title: 'Lunch Break Chaos',
        host: 'MC Neon',
        startTime: new Date(new Date().setHours(12, 0, 0, 0)),
        endTime: new Date(new Date().setHours(14, 0, 0, 0)),
        description: 'Midday madness to fuel your afternoon.',
      },
      {
        id: '3',
        title: 'After Hours',
        host: 'DJ Phoenix',
        startTime: new Date(new Date().setHours(22, 0, 0, 0)),
        endTime: new Date(new Date().setHours(2, 0, 0, 0)),
        description: 'Deep cuts and underground vibes for the night owls.',
      },
    ];
    set({ schedule: mockSchedule });
  },
}));