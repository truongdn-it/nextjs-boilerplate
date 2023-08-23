/* eslint-disable no-unused-vars */
interface ILocalesState {
  locale: TDefaultLocale;
  dict: any;
  changeLocale: (locale: TDefaultLocale) => void;
  setDict: (locale: TDefaultLocale) => void;
}

type TDefaultLocale = 'en' | 'vi';
