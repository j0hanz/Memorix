import { Badge, ListGroup } from 'react-bootstrap';
import { useCommitStatus } from '@/hooks/useCommitStatus';

export default function CommitStatus() {
  const { commits, loading, error } = useCommitStatus();

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
  );
}
