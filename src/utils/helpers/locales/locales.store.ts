import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  StateStorage,
} from 'zustand/middleware';
import { getDictionary } from '@utils/helpers/locales/locales.helper';

import { LOCALES_CONFIG, LOCALES_COOKIE_CONFIG } from './locales.constant';

// Custom storage object
const storage: StateStorage = {
  getItem: (name: string) => {
    return (getCookie(name) as string) || null;
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { ...LOCALES_COOKIE_CONFIG });
  },
  removeItem: (name: string) => {
    deleteCookie(name);
  },
};

const useLocalesStore = create<ILocalesState>()(
  devtools(
    persist(
      (set) => ({
        locale: LOCALES_CONFIG.defaultLocale,
        dict: {},
        changeLocale: (locale: TDefaultLocale) => set({ locale }),
        setDict: async (locale: TDefaultLocale) => {
          set({
            dict: await getDictionary(locale || LOCALES_CONFIG.defaultLocale),
          });
        },
      }),
      {
        name: 'lang',
        storage: createJSONStorage(() => storage),
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !['dict'].includes(key)),
          ),
      },
    ),
    {
      name: 'locales',
    },
  ),
);

export { useLocalesStore };
