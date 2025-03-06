import { ListGroup } from 'react-bootstrap';
import {
  HiOutlineClock,
  HiXMark,
  HiCheck,
  HiArrowPath,
  HiStar,
  HiOutlineArrowPathRoundedSquare,
} from 'react-icons/hi2';
import { TbDoorExit } from 'react-icons/tb';
import styles from '@/components/styles/Modal.module.css';

interface IconExplanationProps {
  icon: React.ReactNode;
  description: string;
}

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
      icon: <HiArrowPath className={styles.listIcon} />,
      description: 'Restart game',
    },
    {
      icon: <TbDoorExit className={styles.listIcon} />,
      description: 'Exit game',
    },
    {
      icon: (
        <HiOutlineClock className={`${styles.listIcon} ${styles.clockIcon}`} />
      ),
      description: 'Game time',
    },
    {
      icon: (
        <HiOutlineArrowPathRoundedSquare
          className={`${styles.listIcon} ${styles.statsIcon}`}
        />
      ),
      description: 'Moves',
    },
    {
      icon: <HiXMark className={`${styles.listIcon} ${styles.wrongPick}`} />,
      description: 'Wrong pick',
    },
    {
      icon: <HiCheck className={`${styles.listIcon} ${styles.success}`} />,
      description: 'Correct pick',
    },
    {
      icon: <HiStar className={`${styles.listIcon} ${styles.starIcon}`} />,
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
