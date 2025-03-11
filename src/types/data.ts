export interface IconExplanationProps {
  icon: React.ReactNode;
  description: string;
}

export interface NavItemProps {
  eventKey: string;
  title: string;
  className: string;
  isActive: boolean;
}

export interface ScoreboardProps {
  moves: number;
  completedTime: string;
}

export interface ScoreRowProps {
  stars: number;
  moves: number;
  time: string | React.ReactNode;
}
