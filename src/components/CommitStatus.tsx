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
    const loadCommits = async () => {
      try {
        const data = await fetchLatestCommits();
        setCommits(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch commits'),
        );
      } finally {
        setLoading(false);
      }
    };

    loadCommits();
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
