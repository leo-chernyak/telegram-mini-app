import React from 'react';

export function Panel(props: { children: React.ReactNode; className?: string }) {
  return <div className={['panel', props.className].filter(Boolean).join(' ')}>{props.children}</div>;
}

export function PanelInner(props: { children: React.ReactNode; className?: string }) {
  return <div className={['panelInner', props.className].filter(Boolean).join(' ')}>{props.children}</div>;
}


