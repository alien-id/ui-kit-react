import * as React from 'react';

import '../../styles/global.css';
import './input.css';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={['alien-input', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export { Input };
