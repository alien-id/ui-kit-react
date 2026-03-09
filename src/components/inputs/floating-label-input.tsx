import * as React from 'react';

import '../../styles/global.css';
import './input.css';

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

function FloatingLabelInput({
  id,
  label,
  className,
  disabled,
  ...props
}: FloatingLabelInputProps) {
  return (
    <div className="alien-floating-wrapper">
      <input
        type="text"
        id={id}
        className={[
          'alien-floating-input',
          disabled && 'alien-floating-input-disabled',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        placeholder=" "
        disabled={disabled}
        {...props}
      />
      <label htmlFor={id} className="alien-floating-label">
        {label}
      </label>
    </div>
  );
}

export { FloatingLabelInput };
export type { FloatingLabelInputProps };
