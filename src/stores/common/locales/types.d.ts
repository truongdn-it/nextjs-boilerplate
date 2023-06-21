/* eslint-disable no-unused-vars */
interface ILocalesState {
  locale: TDefaultLocale
  dict: any
  changeLocale: (locale: TDefaultLocale) => void
  getDict: (locale: TDefaultLocale) => void
}

type TDefaultLocale = 'en' | 'vi'
