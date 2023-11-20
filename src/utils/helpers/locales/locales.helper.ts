const dictionaries = {
  en: () => import('./en/common.json').then((module) => module.default),
  vi: () => import('./vi/common.json').then((module) => module.default),
};

const getDictionary = async (locale: 'vi' | 'en') => dictionaries[locale]();

export { getDictionary };
