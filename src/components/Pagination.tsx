import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { FC } from 'react';

import Button from '@/components/Button';
import type { PaginationProps } from '@/types/components';

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => (
  <div className="d-flex justify-content-center align-items-center gap-3">
    <Button
      onClick={onPrev}
      disabled={page === 1}
      icon={<ArrowBackIosNewIcon fontSize="small" />}
      aria-label="Previous Page"
    />
    <span>
      {page} of {totalPages}
    </span>
    <Button
      onClick={onNext}
      disabled={page === totalPages}
      icon={<ArrowForwardIosIcon fontSize="small" />}
      aria-label="Next Page"
    />
  </div>
);
