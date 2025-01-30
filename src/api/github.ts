import axios from "axios";

const GITHUB_API_URL: string =
  "https://api.github.com/repos/j0hanz/pick-and-pair/commits";
const GITHUB_TOKEN: string | undefined = process.env.REACT_APP_GITHUB_TOKEN;

interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
  author: string;
}

// Fetches the latest commits from the repository
export const fetchLatestCommits = async (): Promise<Commit[]> => {
  try {
    const response = await axios.get<any[]>(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      params: {
        per_page: 3, // Fetch 3 latest commits
      },
    });
    const commits: any[] = response.data;
    return commits.map((commit: any) => ({
      sha: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author.date,
      url: commit.html_url,
      author: commit.author ? commit.author.login : "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching latest commits:", error);
    return [];
  }
};
