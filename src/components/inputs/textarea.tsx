import * as React from 'react';

import '../../styles/global.css';
import './textarea.css';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  /** Show the character counter pill in the bottom-right corner. */
  showCount?: boolean;
}

const FADE = '24px';

function Textarea({
  className,
  style,
  showCount,
  maxLength,
  value,
  defaultValue,
  onChange,
  ref,
  ...props
}: TextareaProps) {
  const [uncontrolledLen, setUncontrolledLen] = React.useState(
    String(defaultValue ?? '').length,
  );
  const len = value !== undefined ? String(value).length : uncontrolledLen;

  // Fade the scrollable edges; drop a fade once that edge is reached.
  const innerRef = React.useRef<HTMLTextAreaElement>(null);
  const [edges, setEdges] = React.useState({ top: false, bottom: false });

  const update = () => {
    const el = innerRef.current;
    if (!el) return;
    const top = el.scrollTop > 0;
    const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    setEdges((p) => (p.top === top && p.bottom === bottom ? p : { top, bottom }));
  };

  // Recompute fade edges after every commit so content changes that don't
  // alter length (e.g. a same-length controlled value swap) still refresh.
  React.useEffect(update);

  const setRefs = (el: HTMLTextAreaElement | null) => {
    innerRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) setUncontrolledLen(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div
      className={['alien-textarea-wrapper', className].filter(Boolean).join(' ')}
      style={style}
    >
      <textarea
        ref={setRefs}
        data-slot="textarea"
        className="alien-textarea"
        style={{
          '--alien-ta-fade-top': edges.top ? FADE : '0px',
          '--alien-ta-fade-bottom': edges.bottom ? FADE : '0px',
        }}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onScroll={update}
        onChange={handleChange}
        {...props}
      />
      {showCount && (
        <span className="alien-textarea-count" aria-hidden="true">
          {maxLength != null ? `${len}/${maxLength}` : len}
        </span>
      )}
    </div>
  );
}

export { Textarea };
export type { TextareaProps };
