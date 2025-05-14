import { useEffect, useState } from 'react';

import { useToast } from '@/hooks/useProvider';
import { fetchLatestCommits } from '@/services/github';
import type { Commit } from '@/types/api';

export function useCommit() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const controller = new AbortController();

    const loadCommits = async () => {
      try {
        const data = await fetchLatestCommits();
        if (!controller.signal.aborted) {
          setCommits(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err as Error);
          showToast('Failed to fetch commit history. Please try again.');
          console.error('Failed to fetch commits:', err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadCommits();

    return () => {
      controller.abort();
    };
  }, [showToast]);

  return { commits, loading, error };
}
