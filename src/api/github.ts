import axios from 'axios';
import { GITHUB_API } from '@/utils/constants';

const GITHUB_API_URL: string =
  'https://api.github.com/repos/j0hanz/Memorix/commits';
// GitHub personal access token (requires public repo access only)
const GITHUB_TOKEN: string | undefined = import.meta.env.VITE_GITHUB_TOKEN;

interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
  author: string;
}

interface GitHubCommitResponse {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
  author: {
    login: string;
  } | null;
}

// Fetches the latest commits from the repository
export const fetchLatestCommits = async (): Promise<Commit[]> => {
  try {
    if (!GITHUB_TOKEN) {
      console.warn('GitHub token not provided. API rate limits may apply.');
    }

    const response = await axios.get<GitHubCommitResponse[]>(GITHUB_API_URL, {
      headers: GITHUB_TOKEN
        ? {
            Authorization: `token ${GITHUB_TOKEN}`,
          }
        : {},
      params: {
        per_page: GITHUB_API.COMMITS_PER_PAGE, // Fetch latest commits
      },
    });
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
