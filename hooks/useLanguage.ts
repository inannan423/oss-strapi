import { zh, en } from '@/i18n'
import { useEffect } from 'react'

export default function useLanguage (): {
  changeLanguage: (language: string) => void
  language: string
  i18n: any
} {
  let language: string = 'zh'

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
    if (typeof window !== 'undefined') {
      localStorage.setItem('strapilanguage', language)
      window.location.reload()
    }
  }

  const i18n = language === 'zh' ? zh : en
  return {
    language,
    i18n,
    changeLanguage
  }
}
