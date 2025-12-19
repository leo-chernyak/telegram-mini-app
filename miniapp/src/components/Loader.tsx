import React from 'react';

export function Loader(props: { visible: boolean }) {
  if (!props.visible) return null;
  return (
    <div className="loaderOverlay" role="alert" aria-busy="true">
      <div className="spinner" />
    </div>
  );
}


