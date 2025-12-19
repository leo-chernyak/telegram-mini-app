import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

type ToastApi = {
  show: (message: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider(props: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const api = useMemo<ToastApi>(() => {
    return {
      show: (msg) => {
        setMessage(msg);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setMessage(null), 2600);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {props.children}
      {message ? (
        <div className="toastWrap">
          <div className="toast">{message}</div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const api = useContext(ToastContext);
  if (!api) throw new Error('ToastProvider is missing');
  return api;
}


