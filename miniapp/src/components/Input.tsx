import React from 'react';

export function Input(props: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email';
}) {
  return (
    <input
      value={props.value}
      type={props.type ?? 'text'}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      disabled={props.disabled}
      style={{
        width: '100%',
        padding: '12px 12px',
        borderRadius: 14,
        border: '1px solid var(--stroke)',
        background: 'rgba(255,255,255,0.03)',
        color: 'var(--text)',
        outline: 'none'
      }}
    />
  );
}

export function TextArea(props: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <textarea
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      disabled={props.disabled}
      rows={5}
      style={{
        width: '100%',
        padding: '12px 12px',
        borderRadius: 14,
        border: '1px solid var(--stroke)',
        background: 'rgba(255,255,255,0.03)',
        color: 'var(--text)',
        outline: 'none',
        resize: 'vertical'
      }}
    />
  );
}


