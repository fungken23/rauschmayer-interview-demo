import { useEffect, useState } from 'react';

interface WordMessage {
  word: string;
  timestamp: number;
}

export function useSSE(url: string | null) {
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setIsConnected(false);
      setCurrentWord(null);
      return;
    }

    let eventSource: EventSource | null = null;

    try {
      eventSource = new EventSource(url);

      eventSource.onopen = () => {
        console.log('SSE connection opened');
        setIsConnected(true);
        setError(null);
      };

      eventSource.onmessage = (event) => {
        try {
          const data: WordMessage = JSON.parse(event.data);
          console.log('Received word:', data.word);
          setCurrentWord(data.word);
        } catch (err) {
          console.error('Error parsing message:', err);
          setError('Failed to parse message');
        }
      };

      eventSource.onerror = (err) => {
        console.error('SSE error:', err);
        setError('Connection error');
        setIsConnected(false);
      };
    } catch (err) {
      console.error('Failed to create EventSource:', err);
      setError('Failed to connect');
    }

    // Cleanup on unmount or URL change
    return () => {
      if (eventSource) {
        console.log('Closing SSE connection');
        eventSource.close();
        setIsConnected(false);
      }
    };
  }, [url]);

  return { currentWord, isConnected, error };
}

