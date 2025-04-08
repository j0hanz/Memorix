import { useState, useEffect } from 'react';
import { fetchLatestCommits } from '@/api/github';
import type { Commit } from '@/types/api';

export function useCommitStatus() {
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
          setError(
            err instanceof Error ? err : new Error('Failed to fetch commits'),
          );
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
