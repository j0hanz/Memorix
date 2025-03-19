import { useState, useEffect } from 'react';
import { fetchLatestCommits } from '@/api/github';
import { Badge, ListGroup } from 'react-bootstrap';
import { Commit } from '@/types/api';

// Fetches and displays the latest commits
export default function LatestCommits() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Cleanup function to prevent memory leaks
    let isMounted = true;
    const loadCommits = async () => {
      // Fetch commits from the GitHub API
      try {
        const data = await fetchLatestCommits();
        // Check if the component is still mounted before updating state
        if (isMounted) {
          setCommits(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error('Failed to fetch commits'),
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadCommits();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div>Loading commit data...</div>;
  }

  if (error) {
    return <div>Error loading commits: {error.message}</div>;
  }

  if (!commits.length) {
    return <div>No commits found.</div>;
  }

  return (
    <>
      <ListGroup>
        {commits.map((commit, index) => {
          const username = commit.author ? commit.author : 'Unknown';

          return (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
              key={commit.sha || index}
            >
              <div>
                <div>{new Date(commit.date).toISOString().split('T')[0]}</div>
                <a href={commit.url}>{commit.message}</a>
              </div>
              <Badge bg="primary" pill>
                {username}
              </Badge>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}
