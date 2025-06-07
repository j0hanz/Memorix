import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import instructionStyles from '@/components/game/styles/GameInstructions.module.css';
import { Modal } from '@/components/modals/Modal';
import modalStyles from '@/components/modals/styles/Modal.module.css';
import { TabNavigation } from '@/components/navigation/TabNavigation';
import { StarRating } from '@/components/ui/StarRating';
import { MODAL_CONFIGS } from '@/constants/configs';
import { SCORING_THRESHOLDS } from '@/constants/scoring';
import type {
  GameInstructionsProps,
  ScoringCriteriaRowProps,
  TabItem,
} from '@/types/components';
import { MODAL_ICONS } from '@/utils/ui/iconUtils';

// GameInstructions component
export function GameInstructions({ show, onClose }: GameInstructionsProps) {
  const [activeKey, setActiveKey] = useState<string>('overview');
  const config = MODAL_CONFIGS.instructions;

  // Tab configuration
  const tabs: TabItem[] = [
    {
      key: 'overview',
      title: 'Guide',
      className: modalStyles.navItemLeft,
      icon: MODAL_ICONS.info(),
    },
    {
      key: 'symbols',
      title: 'Symbols',
      className: modalStyles.navItemCenter,
      icon: MODAL_ICONS.list(),
    },
    {
      key: 'stars',
      title: 'Stars',
      className: modalStyles.navItemRight,
      icon: MODAL_ICONS.starOutline(),
    },
  ];

  // Overview Tab Content
  const OverviewContent = () => (
    <div className={instructionStyles.instructionsContent}>
      <div>
        <h5 className="text-center mb-2">Welcome to Memorix!</h5>
        <p className="my-3">
          Your goal is to match all pairs of cards in this memory game. When the
          game starts, all cards will briefly reveal themselves for 3 seconds
          before flipping back over.
        </p>
        <p className="my-3">
          <strong>Memorize their positions</strong> during this preview time.
          The game consists of 6 pairs of cards (12 cards in total).
        </p>
      </div>
      <div className="d-flex gap-3 mt-4">
        <div className="text-warning">
          {MODAL_ICONS.play(modalStyles.errorArrowIcon)}
        </div>
        <div className="flex-1">
          <small>
            The game rates your performance based on the number of moves and
            time taken to complete the game. Check the Stars tab for details.
          </small>
        </div>
      </div>
    </div>
  );

  // Symbols Tab Content
  const SymbolsContent = () => {
    const gameSymbols = [
      { icon: MODAL_ICONS.restart(), description: 'Restart game' },
      { icon: MODAL_ICONS.exit(), description: 'Exit game' },
      { icon: MODAL_ICONS.timer(), description: 'Game time' },
      { icon: MODAL_ICONS.moves(), description: 'Moves counter' },
      {
        icon: MODAL_ICONS.wrong(modalStyles.wrongPick),
        description: 'Wrong pick',
      },
      {
        icon: MODAL_ICONS.correct(modalStyles.success),
        description: 'Correct pick',
      },
      {
        icon: MODAL_ICONS.star(modalStyles.starIcon),
        description: 'Stars earned',
      },
    ];

    return (
      <div className={instructionStyles.instructionsContent}>
        <div>
          <h5 className="text-center mb-2">Game Symbols & Functions</h5>
          <small className="d-block text-center mb-2">
            Icons used throughout the game and their meanings
          </small>

          <div>
            {gameSymbols.map((item, index) => (
              <div key={index} className="d-flex align-items-center gap-2 py-2">
                <div>{item.icon}</div>
                <div className="flex-1">
                  <small>{item.description}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Stars Tab Content
  const StarsContent = () => {
    const scoringCriteria: ScoringCriteriaRowProps[] = SCORING_THRESHOLDS.map(
      (row) => ({
        stars: row.stars,
        moves: row.moves === Infinity ? MODAL_ICONS.infinite() : row.moves,
        time:
          row.time === Infinity
            ? MODAL_ICONS.infinite()
            : `${String(row.time)}s`,
      }),
    );

    return (
      <div className={instructionStyles.instructionsContent}>
        <div>
          <h5 className="text-center mb-2">Star Rating System</h5>
          <Row className="d-flex justify-content-between align-items-center p-2">
            <Col
              xs={2}
              className="d-flex justify-content-center align-items-center"
            >
              <small>MOVES</small>
            </Col>
            <Col
              xs={2}
              className="d-flex justify-content-center align-items-center"
            >
              <small>STARS</small>
            </Col>
            <Col
              xs={2}
              className="d-flex justify-content-start align-items-center"
            >
              <small>TIME</small>
            </Col>
          </Row>
          <div>
            {scoringCriteria.map((criteria, index) => (
              <Row
                key={index}
                className="d-flex justify-content-between align-items-center p-3"
              >
                <Col
                  xs={2}
                  className="d-flex justify-content-start align-items-center gap-1"
                >
                  {MODAL_ICONS.moves()}
                  <time>{criteria.moves}</time>
                </Col>

                <Col
                  xs={2}
                  className="d-flex justify-content-center align-items-center"
                >
                  <StarRating count={criteria.stars} />
                </Col>

                <Col
                  xs={2}
                  className="d-flex justify-content-start align-items-center gap-1"
                >
                  {MODAL_ICONS.timer()}
                  <time>{criteria.time}</time>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeKey) {
      case 'overview':
        return <OverviewContent />;
      case 'symbols':
        return <SymbolsContent />;
      case 'stars':
        return <StarsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      className={modalStyles.modalContent}
      backdrop={config.backdrop}
    >
      <div className={instructionStyles.instructionsModal}>
        <TabNavigation
          activeKey={activeKey}
          tabs={tabs}
          onSelect={setActiveKey}
        />
        {renderTabContent()}
      </div>
    </Modal>
  );
}
