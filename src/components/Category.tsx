import { CATEGORY_INFO } from '@/constants/constants';
import Button from './Button';
import styles from './styles/Modal.module.css';
import { CategoryDataProps } from '@/types/components';

// Pure data component for category selection
export default function CategoryData({ onSelectCategory }: CategoryDataProps) {
  return (
    <>
      <div className={styles.btnCategoryContainer}>
        {Object.entries(CATEGORY_INFO).map(([category, info]) => (
          <div
            key={category}
            className={styles.btnCategorySelect}
            onClick={() => onSelectCategory(category)}
          >
            {info.name}
          </div>
        ))}
      </div>
    </>
  );
}
