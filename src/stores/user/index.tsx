import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { theme as antdTheme, ConfigProvider } from 'antd';
import { useStore, type StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';

import { useGlobalStore } from '../global';

interface UserStoreProviderProps {
  children: ReactNode;
}

const defaultInitState: UserState = {
  device: 'MOBILE',
  collapsed: true,
  locale: 'en_US',
  logged: false,
  menuList: [],
};

const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setLocale: (locale: 'en_US') => set({ locale }),
    setCollapse: (value: boolean) => set({ collapsed: value }),
    setDevice: (device: 'MOBILE' | 'DESKTOP') => set({ device }),
    setMenuList: (menuList: any[]) => set({ menuList }),
  }));
};

const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);

const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UserStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }
  const theme = useGlobalStore((state) => state.theme);

  useEffect(() => {
    const body = document.body;

    if (theme === 'dark' && !body.hasAttribute('theme-mode')) {
      body.setAttribute('theme-mode', 'dark');
    } else if (theme === 'light' && body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
    }
  }, [theme]);

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#00ADB5' },
          algorithm:
            theme === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </UserStoreContext.Provider>
  );
};

const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`userStore must be use within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};

export { UserStoreProvider, useUserStore };
