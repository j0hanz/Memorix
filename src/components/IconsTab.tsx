import { ListGroup } from 'react-bootstrap';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import FlipOutlinedIcon from '@mui/icons-material/FlipOutlined';
import ReplayCircleFilledOutlinedIcon from '@mui/icons-material/ReplayCircleFilledOutlined';
import styles from './styles/Modal.module.css';
import { IconExplanationProps } from '@/types/data';

// Component for each icon explanation row
function IconExplanation({ icon, description }: IconExplanationProps) {
  return (
    <ListGroup horizontal>
      <ListGroup.Item>{icon}</ListGroup.Item>
      <ListGroup.Item>{description}</ListGroup.Item>
    </ListGroup>
  );
}

export default function IconsTab() {
  // Game icons with their descriptions
  const icons = [
    {
      icon: <ReplayCircleFilledOutlinedIcon className={styles.listIcon} />,
      description: 'Restart game',
    },
    {
      icon: <ExitToAppOutlinedIcon className={styles.listIcon} />,
      description: 'Exit game',
    },
    {
      icon: (
        <TimerOutlinedIcon
          className={`${styles.listIcon} ${styles.clockIcon}`}
        />
      ),
      description: 'Game time',
    },
    {
      icon: (
        <FlipOutlinedIcon
          className={`${styles.listIcon} ${styles.statsIcon}`}
        />
      ),
      description: 'Moves',
    },
    {
      icon: (
        <CloseOutlinedIcon
          className={`${styles.listIcon} ${styles.wrongPick}`}
        />
      ),
      description: 'Wrong pick',
    },
    {
      icon: (
        <CheckOutlinedIcon className={`${styles.listIcon} ${styles.success}`} />
      ),
      description: 'Correct pick',
    },
    {
      icon: (
        <StarOutlinedIcon className={`${styles.listIcon} ${styles.starIcon}`} />
      ),
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
