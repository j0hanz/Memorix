import type { GameResultData, LeaderboardEntry, UserScore } from '@/types/api';

import { axiosReq } from './axios';

export const gameService = {
  // Save a completed game score
  saveGameResult: async (gameData: GameResultData): Promise<unknown> => {
    try {
      const response = await axiosReq.post('/api/memorix/results/', gameData);
      return response.data as unknown;
    } catch (error) {
      console.error('Error saving game result:', error);
      throw error;
    }
  },
  // Get leaderboard entries
  getLeaderboard: async (categoryId?: number): Promise<LeaderboardEntry[]> => {
    const url =
      typeof categoryId === 'number'
        ? `/api/memorix/results/leaderboard/?category=${String(categoryId)}`
        : '/api/memorix/results/leaderboard/';

    try {
      const response = await axiosReq.get<LeaderboardEntry[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },
  // Get categories
  getCategories: async (): Promise<unknown> => {
    try {
      const response = await axiosReq.get('/api/memorix/categories/');
      return response.data as unknown;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  // Get user scores
  getUserScores: async (
    page = 1,
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: UserScore[];
  }> => {
    try {
      const response = await axiosReq.get<{
        count: number;
        next: string | null;
        previous: string | null;
        results: UserScore[];
      }>(`/api/memorix/results/?page=${String(page)}`);
      return response.data;
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { status?: number } }).response ===
          'object' &&
        (error as { response?: { status?: number } }).response?.status === 401
      ) {
        return {
          count: 0,
          next: null,
          previous: null,
          results: [],
        };
      }
      console.error('Error fetching user scores:', error);
      throw error;
    }
  },
  // Get user best scores
  getUserBestScores: async (): Promise<UserScore[]> => {
    try {
      const response = await axiosReq.get<UserScore[]>(
        '/api/memorix/results/best/',
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching best scores:', error);
      throw error;
    }
  },
};
