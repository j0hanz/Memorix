import type { FC } from 'react';

import type { SelectOption } from '@/components/Select';
import Select from '@/components/Select';

import styles from './styles/Modal.module.css';

export interface GameOptions {
  value: string;
  label: string;
}

export interface GameCategoryProps {
  id: string;
  label?: string;
  options: GameOptions[];
  value: string;
  onChange: (v: string) => void;
  loading?: boolean;
  showAllOption?: boolean;
  hideLabel?: boolean;
}

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
