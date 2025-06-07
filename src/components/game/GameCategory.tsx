import type { FC } from 'react';

import { Select } from '@/components/forms/Select';
import styles from '@/components/modals/styles/Modal.module.css';
import type { SelectOption } from '@/types/components';
import type { GameCategoryProps } from '@/types/components';

export const GameCategory: FC<GameCategoryProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  showAllOption = true,
  hideLabel = false,
}) => {
  // Show all option is only available for the filter category
  const selectOptions: SelectOption[] = showAllOption
    ? [{ value: '', label: 'All Categories' }, ...options]
    : [...options];

  const handleChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <div className="mb-2">
      <Select
        id={id}
        value={value}
        options={selectOptions}
        onChange={handleChange}
        label={label}
        hideLabel={hideLabel}
        className={styles.formSelect}
      />
    </div>
  );
};
