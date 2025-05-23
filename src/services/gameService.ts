import type { AxiosError } from 'axios';

import type {
  GameResultData,
  LeaderboardEntry,
  PaginatedLeaderboardEntries,
  PaginatedUserScores,
  UserScore,
} from '@/types/services';

import { get, getList, getPaginated, post } from './apiService';

const ENDPOINTS = {
  results: '/api/memorix/results/',
  bestResults: '/api/memorix/results/best/',
  leaderboard: '/api/memorix/leaderboard/',
  categories: '/api/memorix/categories/',
} as const;

export async function saveGameResult(data: GameResultData): Promise<unknown> {
  return post(
    ENDPOINTS.results,
    data,
    {
      context: 'GameService',
      errorMessage: 'Failed to save game result',
    },
    {
      timeout: 10000,
    },
  );
}

export async function getLeaderboard(
  categoryId?: number,
): Promise<LeaderboardEntry[]> {
  try {
    const result = await get<PaginatedLeaderboardEntries>(
      ENDPOINTS.leaderboard,
      categoryId != null ? { category: categoryId } : undefined,
      {
        context: 'GameService',
        errorMessage: 'Failed to fetch leaderboard',
      },
    );
    return result.results || [];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getCategories(): Promise<string[]> {
  return getList<string>(ENDPOINTS.categories, undefined, {
    context: 'GameService',
    errorMessage: 'Failed to fetch categories',
  });
}

export async function getUserScores(
  page = 1,
  category?: string,
): Promise<PaginatedUserScores> {
  try {
    return await getPaginated<UserScore>(
      ENDPOINTS.results,
      {
        page,
        ...(category ? { category } : {}),
      },
      {
        context: 'GameService',
        errorMessage: 'Failed to fetch user scores',
      },
    );
  } catch (error) {
    const axiosError = error as Error & { details?: AxiosError };
    if (axiosError.details?.response?.status === 401) {
      return { count: 0, next: null, previous: null, results: [] };
    }
    throw error;
  }
}

export async function getUserBestScores(): Promise<UserScore[]> {
  return getList<UserScore>(ENDPOINTS.bestResults, undefined, {
    context: 'GameService',
    errorMessage: 'Failed to fetch best scores',
  });
}
