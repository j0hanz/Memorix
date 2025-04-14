import { CATEGORY_INFO } from '@/constants/constants';
import styles from './styles/Modal.module.css';
import Button from './Button';
import type { CategoryDataProps } from '@/types/components';

// Pure data component for category selection
export default function CategoryData({ onSelectCategory }: CategoryDataProps) {
  return (
    <div
      className={styles.btnCategoryContainer}
      role="group"
      aria-label="Category selection"
    >
      {Object.entries(CATEGORY_INFO).map(([category, info]) => (
        <Button
          key={category}
          className={styles.btnCategorySelect}
          onClick={() => onSelectCategory(category)}
          aria-label={`Select ${info.name} category`}
          text={info.name}
        />
      ))}
    </div>
  );
}
