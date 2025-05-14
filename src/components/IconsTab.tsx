import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { ListGroup } from 'react-bootstrap';

import type { IconExplanationProps } from '@/types/data';

import styles from './styles/Modal.module.css';

// Component for each icon explanation row
function IconExplanation({ icon, description }: IconExplanationProps) {
  return (
    <ListGroup horizontal={true}>
      <ListGroup.Item>{icon}</ListGroup.Item>
      <ListGroup.Item>{description}</ListGroup.Item>
    </ListGroup>
  );
}

export function IconsTab() {
  // Game icons with their descriptions
  const icons = [
    {
      icon: <ReplayCircleFilledOutlinedIcon fontSize="small" />,
      description: 'Restart game',
    },
    {
      icon: <ExitToAppOutlinedIcon fontSize="small" />,
      description: 'Exit game',
    },
    {
      icon: <TimerOutlinedIcon fontSize="small" />,
      description: 'Game time',
    },
    {
      icon: <FlipOutlinedIcon fontSize="small" />,
      description: 'Moves',
    },
    {
      icon: <CloseOutlinedIcon className={styles.wrongPick} fontSize="small" />,
      description: 'Wrong pick',
    },
    {
      icon: <CheckOutlinedIcon className={styles.success} fontSize="small" />,
      description: 'Correct pick',
    },
    {
      icon: <StarOutlinedIcon className={styles.starIcon} fontSize="small" />,
      description: 'Stars earned',
    },
  ];

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Symbols used in the game and their functions.
        </ListGroup.Item>
      </ListGroup>
      {icons.map((item, index) => (
        <IconExplanation
          key={index}
          icon={item.icon}
          description={item.description}
        />
      ))}
    </>
  );
}
