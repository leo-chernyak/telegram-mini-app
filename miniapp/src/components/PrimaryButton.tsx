import React from 'react';
import { Button } from './Button';

export function PrimaryButton(props: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <Button variant="primary" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Button>
  );
}


