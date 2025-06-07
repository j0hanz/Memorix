import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const SERVER_CHECK_INTERVAL = 30000;
const SERVER_REQUEST_TIMEOUT = 5000;

export function useServerStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const serverUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  useEffect(() => {
    const checkStatus = async (): Promise<void> => {
      if (!serverUrl) {
        console.error('VITE_API_BASE_URL is not defined in .env file.');
        setIsOnline(false);
        setIsLoading(false);
        return;
      }
      try {
        await axios.get(serverUrl, { timeout: SERVER_REQUEST_TIMEOUT });
        setIsOnline(true);
      } catch (error: unknown) {
        setIsOnline(false);
        if (error instanceof AxiosError) {
          console.warn(
            `Server status check failed for ${serverUrl}:`,
            error.message,
          );
        }
      } finally {
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };

    void checkStatus();

    const intervalId = setInterval(() => {
      void checkStatus();
    }, SERVER_CHECK_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [serverUrl, isLoading]);

  return { isOnline, isLoading };
}
