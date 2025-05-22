import type { AxiosError } from 'axios';

import { axiosReq } from '@/services/axios';
import type {
  GameResultData,
  LeaderboardEntry,
  PaginatedLeaderboardEntries,
  PaginatedUserScores,
  UserScore,
} from '@/types/services';
import { handleAsyncOperation } from '@/utils/errorUtils';

export const gameService = {
  async saveGameResult(data: GameResultData): Promise<unknown> {
    const [result, error] = await handleAsyncOperation(
      () => axiosReq.post('/api/memorix/results/', data),
      {
        context: 'GameService',
        errorMessage: 'Failed to save game result',
      },
    );

    if (error) {
      throw new Error(error.message);
    }
    return result?.data;
  },

  async getLeaderboard(categoryId?: number): Promise<LeaderboardEntry[]> {
    const [result, error] = await handleAsyncOperation(
      () =>
        axiosReq.get<PaginatedLeaderboardEntries>('/api/memorix/leaderboard/', {
          params: categoryId != null ? { category: categoryId } : undefined,
        }),
      {
        context: 'GameService',
        errorMessage: 'Failed to fetch leaderboard',
      },
    );

    if (error) {
      throw new Error(error.message);
    }
    return result?.data?.results || [];
  },

  async getCategories(): Promise<string[]> {
    const [result, error] = await handleAsyncOperation(
      () => axiosReq.get<string[]>('/api/memorix/categories/'),
      {
        context: 'GameService',
        errorMessage: 'Failed to fetch categories',
      },
    );

    if (error) {
      throw new Error(error.message);
    }
    return result?.data || [];
  },

  async getUserScores(
    page = 1,
    category?: string,
  ): Promise<PaginatedUserScores> {
    const [result, error] = await handleAsyncOperation(
      () =>
        axiosReq.get<PaginatedUserScores>('/api/memorix/results/', {
          params: { page, ...(category ? { category } : {}) },
        }),
      {
        context: 'GameService',
        errorMessage: 'Failed to fetch user scores',
      },
    );

    if (error) {
      const axiosError = error.details as AxiosError;
      if (axiosError.response?.status === 401) {
        return { count: 0, next: null, previous: null, results: [] };
      }
      throw new Error(error.message);
    }
    return (
      result?.data || { count: 0, next: null, previous: null, results: [] }
    );
  },

  async getUserBestScores(): Promise<UserScore[]> {
    const [result, error] = await handleAsyncOperation(
      () => axiosReq.get<UserScore[]>('/api/memorix/results/best/'),
      {
        context: 'GameService',
        errorMessage: 'Failed to fetch best scores',
      },
    );

    if (error) {
      throw new Error(error.message);
    }
    return result?.data || [];
  },
};
