import type { GameResultData, LeaderboardEntry, UserScore } from '@/types/api';

import { axiosReq } from './axios';

const gameService = {
  // Save a completed game score
  saveGameResult: async (gameData: GameResultData) => {
    try {
      const response = await axiosReq.post('/api/memorix/results/', gameData);
      return response.data;
    } catch (error) {
      console.error('Error saving game result:', error);
      throw error;
    }
  },

  // Get leaderboard entries
  getLeaderboard: async (categoryId?: number) => {
    const url = categoryId
      ? `/api/memorix/results/leaderboard/?category=${categoryId}`
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
  getCategories: async () => {
    try {
      const response = await axiosReq.get('/api/memorix/categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  // Get user scores
  getUserScores: async () => {
    try {
      const response = await axiosReq.get<UserScore[]>('/api/memorix/results/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user scores:', error);
      throw error;
    }
  },
};

export default gameService;
