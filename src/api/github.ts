import axios from 'axios';

const GITHUB_API_URL: string =
  'https://api.github.com/repos/j0hanz/GIFMatch/commits';
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
    const response = await axios.get<GitHubCommitResponse[]>(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      params: {
        per_page: 3, // Fetch 3 latest commits
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
