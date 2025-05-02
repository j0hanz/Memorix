import { Modal } from 'react-bootstrap';
import CategoryData from '@/components/Category';
import Button from '@/components/Button';
import type { CategoryProps } from '@/types/components';
import styles from './styles/Modal.module.css';

export function CategorySelection({
  show,
  onClose,
  onSelectCategory,
}: CategoryProps) {
  return (
    <Modal show={show} onHide={onClose} centered className={styles.modal}>
      <Modal.Header className="border-0 d-flex justify-content-center">
        <Modal.Title>Select Category</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-0">
        <CategoryData onSelectCategory={onSelectCategory} />
      </Modal.Body>
      <Modal.Footer className="border-0 mt-3">
        <Button className={styles.btnClose} onClick={onClose} text="Close" />
      </Modal.Footer>
    </Modal>
  );
}
