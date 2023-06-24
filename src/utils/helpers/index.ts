const dictionaries = {
  en: () => import('@locales/en/common.json').then((module) => module.default),
  vi: () => import('@locales/vi/common.json').then((module) => module.default),
};

const getDictionary = async (locale: 'vi' | 'en') => dictionaries[locale]();

export { getDictionary };
