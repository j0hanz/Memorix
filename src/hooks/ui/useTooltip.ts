import { useState } from 'react';

export function useTooltip() {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return {
    visible,
    showTooltip,
    hideTooltip,
  };
}
