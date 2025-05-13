import type { AxiosError } from 'axios';

import { axiosReq } from '@/services/axios';
import type {
  GameResultData,
  LeaderboardEntry,
  PaginatedUserScores,
  UserScore,
} from '@/types/api';

function handleError(message: string, error: unknown): never {
  console.error(message, error);
  throw error;
}

export const gameService = {
  async saveGameResult(data: GameResultData): Promise<unknown> {
    try {
      const response = await axiosReq.post('/api/memorix/results/', data);
      return response.data;
    } catch (error) {
      return handleError('Error saving game result:', error);
    }
  },

  async getLeaderboard(categoryId?: number): Promise<LeaderboardEntry[]> {
    try {
      const response = await axiosReq.get<LeaderboardEntry[]>(
        '/api/memorix/results/leaderboard/',
        { params: categoryId != null ? { category: categoryId } : undefined },
      );
      return response.data;
    } catch (error) {
      return handleError('Error fetching leaderboard:', error);
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const response = await axiosReq.get<string[]>('/api/memorix/categories/');
      return response.data;
    } catch (error) {
      return handleError('Error fetching categories:', error);
    }
  },

  async getUserScores(
    page = 1,
    category?: string,
  ): Promise<PaginatedUserScores> {
    try {
      const response = await axiosReq.get<PaginatedUserScores>(
        '/api/memorix/results/',
        { params: { page, ...(category ? { category } : {}) } },
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return { count: 0, next: null, previous: null, results: [] };
      }
      return handleError('Error fetching user scores:', error);
    }
  },

  async getUserBestScores(): Promise<UserScore[]> {
    try {
      const response = await axiosReq.get<UserScore[]>(
        '/api/memorix/results/best/',
      );
      return response.data;
    } catch (error) {
      return handleError('Error fetching best scores:', error);
    }
  },
};
