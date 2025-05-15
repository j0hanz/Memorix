import type { ChangeEvent, FC } from 'react';

import styles from './styles/Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  label?: string;
  hideLabel?: boolean;
  ariaLabel?: string;
}

export const Select: FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  className = '',
  required = false,
  label,
  hideLabel = false,
  ariaLabel,
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const selectClassName = `${styles.select} ${className}`.trim();
  const labelId = id ? `${id}-label` : undefined;

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          id={labelId}
          className={hideLabel ? 'visually-hidden' : ''}
        >
          {label}
        </label>
      )}
      <div className={styles.selectContainer}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={selectClassName}
          required={required}
          aria-label={ariaLabel || label || 'Select field'}
          aria-labelledby={label && labelId ? labelId : undefined}
        >
          {placeholder && (
            <option value="" disabled={required && !!value}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className={styles.selectArrow} />
      </div>
    </>
  );
};
