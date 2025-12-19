export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }

  type TelegramWebApp = {
    initData: string;
    initDataUnsafe: any;
    ready: () => void;
    close: () => void;
    openInvoice: (url: string, callback?: (status: string) => void) => void;
    MainButton: {
      isVisible: boolean;
      text: string;
      show: () => void;
      hide: () => void;
      enable: () => void;
      disable: () => void;
      setText: (text: string) => void;
      onClick: (cb: () => void) => void;
      offClick: (cb: () => void) => void;
    };
  };
}


