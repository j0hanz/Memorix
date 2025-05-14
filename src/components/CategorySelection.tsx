import CategoryData from '@/components/Category';
import { Modal } from '@/components/Modal';
import type { CategoryProps } from '@/types/components';

export function CategorySelection({
  show,
  onClose,
  onSelectCategory,
}: CategoryProps) {
  return (
    <Modal show={show} onClose={onClose} title="Select Category">
      <CategoryData onSelectCategory={onSelectCategory} />
    </Modal>
  );
}
