import { useState, useEffect } from 'react';
import { fetchLatestCommits } from '@/api/github';
import type { Commit } from '@/types/api';

export function useCommit() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCommits = async () => {
      try {
        const data = await fetchLatestCommits();
        if (isMounted) {
          setCommits(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          console.error('Failed to fetch commits:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCommits();

    return () => {
      isMounted = false;
    };
  }, []);

  return { commits, loading, error };
}
