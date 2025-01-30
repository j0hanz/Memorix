import React, { useEffect, useState } from 'react';
import { fetchLatestCommits } from '../api/github';
import { Badge, ListGroup } from 'react-bootstrap';

interface Commit {
  sha: string;
  date: string;
  message: string;
  url: string;
  author: string | null;
}

const LatestCommits = () => {
  const [commits, setCommits] = useState<Commit[]>([]);

  // Fetch latest commits on component mount
  useEffect(() => {
    const getCommitData = async () => {
      const data = await fetchLatestCommits();
      setCommits(data);
    };
    getCommitData();
  }, []);

  if (!commits.length) {
    return <div>Loading commit data...</div>;
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
};

export default LatestCommits;
