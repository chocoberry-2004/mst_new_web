import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

// Fetch functions
const fetchEvent = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/events/`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return await response.json();
};

const fetchEventType = async () => {
  const response = await fetch("/js/eventType.json");
  if (!response.ok) throw new Error("Failed to fetch event types");
  return await response.json();
};

// Create context
const EventContext = createContext(null);

// Provider component
export const EventProvider = ({ children }) => {
  const { data: events, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvent
  });

  const { data: eventType, isLoading: eventTypeLoading, error: eventTypeError } = useQuery({
    queryKey: ['eventType'],
    queryFn: fetchEventType
  });

  // const loading = eventsLoading || eventTypeLoading;
  // const error = eventsError || eventTypeError;

  const loading = eventsLoading;
  const error = eventsError;

  console.log(events);
  
  return (
    <EventContext.Provider value={{ events, eventType, loading, error }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use context
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within EventProvider");
  }
  return context;
};