import { Button } from '@/components/buttons/Button';
import btnStyles from '@/components/styles/Button.module.css';
import { CATEGORY_INFO } from '@/constants/game';
import type { CategoryDataProps } from '@/types/components';
import { getCategoryIcon } from '@/utils/game/categoryUtils';

import styles from '../styles/Modal.module.css';

// Pure data component for category selection
export function CategoryData({ onSelectCategory }: CategoryDataProps) {
  return (
    <div className={styles.categoryDataContainer}>
      <div
        className={btnStyles.btnCategoryContainer}
        role="group"
        aria-label="Category selection"
      >
        {Object.entries(CATEGORY_INFO).map(([category, info]) => (
          <Button
            key={category}
            className={btnStyles.btnCategorySelect}
            category={category}
            onClick={() => {
              onSelectCategory(category);
            }}
            aria-label={`Select ${info.name} category`}
            text={info.name}
            icon={getCategoryIcon(info.name)}
            color="secondary"
            variant="menu"
          />
        ))}
      </div>
    </div>
  );
}
