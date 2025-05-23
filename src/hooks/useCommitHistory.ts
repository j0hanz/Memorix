import { useFetch } from '@/hooks/useFetch';
import { useServices } from '@/hooks/useServices';
import type { Commit } from '@/types/services';

export function useCommit() {
  const { github } = useServices();
  const { data, loading, error } = useFetch<Commit[]>(
    async () => {
      return await github.getLatestCommits();
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
