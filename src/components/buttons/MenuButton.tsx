import { Button } from '@/components/buttons/Button';
import type { MenuButtonProps } from '@/types/components';

export const MenuButton = ({
  onClick,
  icon,
  text,
  className,
  color = 'secondary',
  variant = 'menu',
}: MenuButtonProps) => (
  <Button
    onClick={onClick}
    className={className}
    variant={variant}
    icon={icon}
    text={text}
    color={color}
  />
);
