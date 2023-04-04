import { zh, en } from '@/i18n'

export default function useLanguage (): {
  changeLanguage: (language: string) => void
  language: string
  i18n: any
} {
  let language: string
  if (typeof window !== 'undefined') {
    if (localStorage === null || localStorage.getItem('strapilanguage') === null) {
      localStorage.setItem('strapilanguage', 'zh')
      language = 'zh'
    } else {
      language = localStorage.getItem('strapilanguage') as string
    }
  } else {
    language = 'zh'
  }

  // 暴露函数，用于切换语言
  const changeLanguage = (language: string): void => {
    localStorage.setItem('strapilanguage', language)
    window.location.reload()
  }

  const i18n = language === 'zh' ? zh : en
  return {
    language,
    i18n,
    changeLanguage
  }
}
