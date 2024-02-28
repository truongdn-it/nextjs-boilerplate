import { createContext, ReactNode, useContext, useRef } from 'react';
import { WEB_ROUTES } from '@/utils/constants';
import { useStore, type StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';

const defaultInitState: AdminState = {
  activeTagId: '',
  tags: [],
};

const createAdminlStore = (initState: AdminState = defaultInitState) => {
  return createStore<AdminStore>()((set) => ({
    ...initState,
    setActiveTag: (tag) => {
      return set((state) => ({
        ...state,
        activeTagId: tag,
      }));
    },
    addTag: (payload) => {
      set((state) => {
        const newTags: any[] = [...state.tags];
        if (!newTags.find((tag: any) => tag.path === payload.path)) {
          newTags.push(payload);
        }

        return {
          ...state,
          tags: newTags,
          activeTagId: payload.path,
        };
      });
    },
    removeTag: (payload) => {
      set((state) => {
        const newTags = [...state.tags];
        let newActiveTagId = state.activeTagId;
        if (payload === WEB_ROUTES.DASHBOARD || newTags.length === 1) {
          return state;
        }

        let lastIndex = 0;

        newTags.forEach((tag, i) => {
          if (tag.path === payload) {
            newTags.splice(i, 1);
            lastIndex = i - 1;
          }
        });
        const tagList = newTags.filter((tag) => tag.path !== payload);

        if (tagList.length && newActiveTagId === payload) {
          if (lastIndex >= 0) {
            newActiveTagId = tagList[lastIndex].path;
          } else {
            newActiveTagId = tagList[0].path;
          }
        }

        return {
          ...state,
          tags: newTags,
          activeTagId: newActiveTagId,
        };
      });
    },
    removeAllTag: () => {
      set((state) => {
        return {
          ...state,
          activeTagId: state.tags[0].path,
          tags: [state.tags[0]],
        };
      });
    },
    removeOtherTag: () => {
      set((state) => {
        const activeTag = state.tags.find(
          (tag) => tag.path === state.activeTagId,
        );
        const activeIsDashboard = activeTag!.path === state.tags[0].path;

        return {
          ...state,
          tags: activeIsDashboard
            ? [state.tags[0]]
            : [state.tags[0], activeTag!],
        };
      });
    },
  }));
};

interface AdminStoreProviderProps {
  children: ReactNode;
}

const AdminStoreContext = createContext<StoreApi<AdminStore> | null>(null);

const AdminStoreProvider = ({ children }: AdminStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AdminStore>>();
  if (!storeRef.current) {
    storeRef.current = createAdminlStore();
  }

  return (
    <AdminStoreContext.Provider value={storeRef.current}>
      {children}
    </AdminStoreContext.Provider>
  );
};

const useAdminStore = <T,>(selector: (store: AdminStore) => T): T => {
  const adminStoreContext = useContext(AdminStoreContext);

  if (!adminStoreContext) {
    throw new Error(`adminStore must be use within AdminStoreProvider`);
  }

  return useStore(adminStoreContext, selector);
};

export { AdminStoreProvider, useAdminStore };
