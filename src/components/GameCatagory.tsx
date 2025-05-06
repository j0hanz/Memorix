import type { FC } from 'react';
import { Form } from 'react-bootstrap';

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
}

export const GameCategory: FC<GameCategoryProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  loading = false,
}) => (
  <Form.Group className="mb-3">
    {label && (
      <Form.Label htmlFor={id} className="m-2">
        {label}
      </Form.Label>
    )}
    <Form.Select
      id={id}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      disabled={loading}
      className={styles.formSelect}
    >
      <option value="">All Categories</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
);
