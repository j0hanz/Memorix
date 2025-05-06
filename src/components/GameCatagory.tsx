import type { FC } from 'react';

import type { SelectOption } from '@/components/Select';
import Select from '@/components/Select';
import type { GameCategoryProps } from '@/types/components';

import styles from './styles/Modal.module.css';

export const GameCategory: FC<GameCategoryProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  loading = false,
  showAllOption = true,
  hideLabel = false,
}) => {
  const selectOptions: SelectOption[] = showAllOption ? options : [...options];

  return (
    <div className="mb-2">
      <Select
        id={id}
        value={value}
        onChange={onChange}
        options={selectOptions}
        placeholder={showAllOption ? 'All Categories' : undefined}
        disabled={loading}
        className={styles.formSelect}
        label={!hideLabel ? label : undefined}
        hideLabel={hideLabel}
      />
    </div>
  );
};

export default GameCategory;
