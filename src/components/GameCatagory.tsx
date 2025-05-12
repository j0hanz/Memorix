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
  // Ensure options are unique by value
  const selectOptions: SelectOption[] = showAllOption
    ? [{ value: '', label: 'All Categories' }, ...options]
    : [...options];
  // Sort options by label
  const handleChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <div className="mb-2">
      <Select
        id={id}
        value={value}
        onChange={handleChange}
        options={selectOptions}
        placeholder={showAllOption ? undefined : 'Select Category'}
        disabled={loading}
        className={styles.formSelect}
        label={!hideLabel ? label : undefined}
        hideLabel={hideLabel}
      />
    </div>
  );
};

export default GameCategory;
