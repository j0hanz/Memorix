import { ListGroup } from 'react-bootstrap';

import type { IconExplanationProps } from '@/types/components';
import { MODAL_ICONS } from '@/utils/ui/iconUtils';

import styles from '../styles/Modal.module.css';

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
      icon: MODAL_ICONS.restart(),
      description: 'Restart game',
    },
    {
      icon: MODAL_ICONS.exit(),
      description: 'Exit game',
    },
    {
      icon: MODAL_ICONS.timer(),
      description: 'Game time',
    },
    {
      icon: MODAL_ICONS.moves(),
      description: 'Moves',
    },
    {
      icon: MODAL_ICONS.wrong(styles.wrongPick),
      description: 'Wrong pick',
    },
    {
      icon: MODAL_ICONS.correct(styles.success),
      description: 'Correct pick',
    },
    {
      icon: MODAL_ICONS.star(styles.starIcon),
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
