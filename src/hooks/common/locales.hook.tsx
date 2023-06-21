import { useEffect } from 'react'
import { useLocalesStore } from 'src/stores/common/locales'

const useTranslations = () => {
  const locale = useLocalesStore((state) => state.locale)
  const dict = useLocalesStore((state) => state.dict)
  const getDict = useLocalesStore((state) => state.getDict)

  const t = (key: string, options?: any) => {
    if (!dict) return key

    const keys = key.split('.')
    let value = dict

    keys.forEach((key) => {
      value = value?.[key] || key
    })

    if (options) {
      Object.keys(options)?.forEach((key) => {
        value = value?.replace(`{{${key}}}`, options?.[key])
      })
    }

    return value
  }

  useEffect(() => {
    getDict(locale)
  }, [locale, getDict])

  return { locale, t }
}

export { useTranslations }
