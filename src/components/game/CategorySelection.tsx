import { CategoryData } from '@/components/game/Category';
import { Modal } from '@/components/modals/Modal';
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
