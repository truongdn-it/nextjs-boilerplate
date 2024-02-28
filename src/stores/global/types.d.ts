type GlobalState = {
  theme: 'dark' | 'light';
};

type GlobalActions = {
  setTheme: (theme: 'dark' | 'light') => void;
};

type GlobalStore = GlobalState & GlobalActions;
