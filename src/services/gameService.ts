import type { AxiosError } from 'axios';

import { GAME_ENDPOINTS } from '@/constants/api';
import type {
  GameResultData,
  LeaderboardEntry,
  PaginatedLeaderboardEntries,
  PaginatedUserScores,
  UserScore,
} from '@/types/services';

import { get, getList, getPaginated, post } from './apiService';

// This service provides methods to interact with game results and leaderboards.
export async function saveGameResult(data: GameResultData): Promise<void> {
  await post(
    GAME_ENDPOINTS.results,
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

// This function retrieves the leaderboard entries for a specific category.
export async function getLeaderboard(
  categoryId?: number,
): Promise<LeaderboardEntry[]> {
  const result = await get<PaginatedLeaderboardEntries>(
    GAME_ENDPOINTS.leaderboard,
    categoryId != null ? { category: categoryId } : undefined,
    {
      context: 'GameService',
      errorMessage: 'Failed to fetch leaderboard',
    },
  );
  return result.results || [];
}

// This function retrieves the list of game categories.
export async function getCategories(): Promise<string[]> {
  return getList<string>(GAME_ENDPOINTS.categories, undefined, {
    context: 'GameService',
    errorMessage: 'Failed to fetch categories',
  });
}

// This function retrieves paginated user scores, optionally filtered by category.
export async function getUserScores(
  page = 1,
  category?: string,
): Promise<PaginatedUserScores> {
  try {
    return await getPaginated<UserScore>(
      GAME_ENDPOINTS.results,
      {
        page,
        ...(category ? { category_code: category.toUpperCase() } : {}),
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

// This function retrieves the best scores of the user.
export async function getUserBestScores(): Promise<UserScore[]> {
  return getList<UserScore>(GAME_ENDPOINTS.bestResults, undefined, {
    context: 'GameService',
    errorMessage: 'Failed to fetch best scores',
  });
}
