import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

type ToastTone = 'neutral' | 'ok' | 'danger';

type ToastApi = {
  show: (message: string, tone?: ToastTone) => void;
  ok: (message: string) => void;
  error: (message: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider(props: { children: React.ReactNode }) {
  const [state, setState] = useState<{ message: string; tone: ToastTone } | null>(null);
  const timer = useRef<number | null>(null);

  const api = useMemo<ToastApi>(() => {
    const show = (msg: string, tone: ToastTone = 'neutral') => {
      setState({ message: msg, tone });
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setState(null), 2600);
    };
    return {
      show,
      ok: (msg) => show(msg, 'ok'),
      error: (msg) => show(msg, 'danger')
    };
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {props.children}
      {state ? (
        <div className="toastWrap">
          <div className="toast" data-tone={state.tone}>
            {state.message}
          </div>
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


