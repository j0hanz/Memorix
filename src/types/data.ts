export interface IconExplanationProps {
  icon: React.ReactNode;
  description: string;
}

export interface ScoreboardProps {
  moves: number;
  completedTime: string;
}

export interface ScoreRowProps {
  stars: number;
  moves: number | React.ReactNode;
  time: string | React.ReactNode;
}
