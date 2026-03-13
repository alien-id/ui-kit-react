import '../../styles/global.css';
import './buttons.css';
import type { ButtonProps } from './types';

export const ButtonSmall = ({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[
        'alien-button',
        'alien-button-small',
        `alien-button-${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};
