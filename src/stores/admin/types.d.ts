type AdminState = {
  activeTagId: string;
  tags: any[];
};

type AdminActions = {
  setActiveTag: (tag: string) => void;
  addTag: (tag: any) => void;
  removeTag: (tag: string) => void;
  removeAllTag: () => void;
  removeOtherTag: () => void;
};

type AdminStore = AdminState & AdminActions;
