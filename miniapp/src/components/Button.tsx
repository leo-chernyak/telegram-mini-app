import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export function Button(props: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  title?: string;
}) {
  const v = props.variant ?? 'secondary';
  const className = [
    'btn',
    v === 'primary' ? 'btnPrimary' : '',
    v === 'tertiary' ? 'btnTertiary' : '',
    props.loading ? 'btnLoading' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      disabled={props.disabled || props.loading}
      onClick={props.onClick}
      title={props.title}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {props.loading ? (
          <span
            className="spinner"
            style={{
              width: 14,
              height: 14,
              borderWidth: 2,
              borderTopColor: 'rgba(255,255,255,0.85)'
            }}
          />
        ) : null}
        <span>{props.children}</span>
      </span>
    </button>
  );
}


