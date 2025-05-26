import axios from 'axios';

import { GITHUB_API } from '@/constants/api';
import type { Commit, GitHubCommitResponse } from '@/types/services';

const githubAxios = axios.create({
  baseURL: '',
  withCredentials: false,
});

const apiUrl = GITHUB_API.API_URL;
const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

// This service provides methods to interact with GitHub commits.
export async function getLatestCommits(): Promise<Commit[]> {
  if (!token) {
    console.warn('GitHub token not provided. API rate limits may apply.');
  }

  const response = await githubAxios.get<GitHubCommitResponse[]>(apiUrl, {
    headers: token
      ? {
          Authorization: `token ${token}`,
        }
      : {},
    params: {
      per_page: GITHUB_API.COMMITS_PER_PAGE,
    },
  });

  return response.data.map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message,
    date: commit.commit.author.date,
    url: commit.html_url,
    author: commit.author?.login || 'Unknown',
  }));
}
