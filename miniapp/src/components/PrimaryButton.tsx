import React from 'react';

export function PrimaryButton(props: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      style={{
        width: '100%',
        border: 'none',
        borderRadius: 14,
        padding: '14px 16px',
        background: props.disabled ? 'rgba(255,255,255,0.10)' : 'var(--accent)',
        color: props.disabled ? 'rgba(255,255,255,0.55)' : 'var(--accentText)',
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: 0.2
      }}
    >
      {props.children}
    </button>
  );
}


