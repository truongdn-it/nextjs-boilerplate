type UserState = {
  device: 'MOBILE' | 'DESKTOP';
  collapsed: boolean;
  locale: 'en_US' | 'vi_VN';
  logged: boolean;
  menuList: any[];
};

type UserActions = {
  setLocale: (locale: 'en_US') => void;
  setCollapse: (value: boolean) => void;
  setDevice: (device: 'MOBILE' | 'DESKTOP') => void;
  setMenuList: (menuList: any[]) => void;
};

type UserStore = UserState & UserActions;
