import axios from 'axios';
import { GITHUB_API } from '@/constants/constants';
import { Commit, GitHubCommitResponse } from '@/types/api';

const GITHUB_API_URL: string = GITHUB_API.API_URL;
// GitHub personal access token (requires public repo access only)
const GITHUB_TOKEN: string | undefined = import.meta.env.VITE_GITHUB_TOKEN;

// GitHub API base URL
const githubAxios = axios.create({
  baseURL: '',
});

// Fetches the latest commits from the repository
export const fetchLatestCommits = async (): Promise<Commit[]> => {
  try {
    if (!GITHUB_TOKEN) {
      console.warn('GitHub token not provided. API rate limits may apply.');
    }

    const response = await githubAxios.get<GitHubCommitResponse[]>(
      GITHUB_API_URL,
      {
        headers: GITHUB_TOKEN
          ? {
              Authorization: `token ${GITHUB_TOKEN}`,
            }
          : {},
        params: {
          per_page: GITHUB_API.COMMITS_PER_PAGE, // Fetch latest commits
        },
      },
    );
    const commits = response.data;
    return commits.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author.date,
      url: commit.html_url,
      author: commit.author ? commit.author.login : 'Unknown',
    }));
  } catch (error) {
    console.error('Error fetching latest commits:', error);
    return [];
  }
};
