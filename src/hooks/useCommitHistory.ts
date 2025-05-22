import { useFetch } from '@/hooks/useFetch';
import { fetchLatestCommits } from '@/services/github';
import type { Commit } from '@/types/services';

export function useCommit() {
  const { data, loading, error } = useFetch<Commit[]>(
    async () => {
      return await fetchLatestCommits();
    },
    {
      showToastOnError: true,
      errorCategory: 'api',
    },
  );

  return {
    commits: data || [],
    loading,
    error: error ? new Error(error) : null,
  };
}
