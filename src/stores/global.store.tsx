import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import * as Sentry from '@sentry/nextjs';
import { env } from 'env.mjs';
import { useStore, type StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';

type GlobalState = {
  theme: 'dark' | 'light';
};

type GlobalActions = {
  setTheme: (theme: 'dark' | 'light') => void;
};

type GlobalStore = GlobalState & GlobalActions;

const defaultInitState: GlobalState = {
  theme: 'light',
};

const createGlobalStore = (initState: GlobalState = defaultInitState) => {
  return createStore<GlobalStore>()((set) => ({
    ...initState,
    setTheme: (theme: 'light' | 'dark') => {
      const body = document.body;

      if (theme === 'dark') {
        if (!body.hasAttribute('theme-mode')) {
          body.setAttribute('theme-mode', 'dark');
        }
      } else {
        if (body.hasAttribute('theme-mode')) {
          body.removeAttribute('theme-mode');
        }
      }
      return set({ theme });
    },
  }));
};

interface GlobalStoreProviderProps {
  children: ReactNode;
}

const GlobalStoreContext = createContext<StoreApi<GlobalStore> | null>(null);

const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<StoreApi<GlobalStore>>();
  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.init({
        dsn: env.NEXT_PUBLIC_SENTRY_DSN,

        // Adjust this value in production, or use tracesSampler for greater control
        tracesSampleRate: 1,

        // Setting this option to true will print useful information to the console while you're setting up Sentry.
        debug: false,

        replaysOnErrorSampleRate: 1.0,

        // This sets the sample rate to be 10%. You may want this to be 100% while
        // in development and sample at a lower rate in production
        replaysSessionSampleRate: 0.1,

        // You can remove this option if you're not planning to use the Sentry Session Replay feature:
        integrations: [
          Sentry.replayIntegration({
            // Additional Replay configuration goes in here, for example:
            maskAllText: true,
            blockAllMedia: true,
          }),
          Sentry.captureConsoleIntegration({
            levels: ['error', 'debug'],
          }),
        ],
      });
    }
  }, []);

  function matchMode(e: MediaQueryListEvent) {
    if (!storeRef.current) return;
    storeRef.current.setState({
      theme: e.matches ? 'dark' : 'light',
    });
  }

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener('change', matchMode);
    }

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const userTheme = localStorage.getItem('theme') as GlobalState['theme'];

    storeRef.current?.setState({ theme: userTheme || systemTheme });
  }, []);

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const globalStoreContext = useContext(GlobalStoreContext);

  if (!globalStoreContext) {
    throw new Error(`globalStore must be use within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};

export { GlobalStoreProvider, useGlobalStore };
