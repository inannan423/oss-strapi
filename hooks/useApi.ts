export default function useApi (): {
  apiPrefix: string
  setApiPrefix: (apiPrefix: string) => void
  hasApiPrefix: boolean
} {
  let apiPrefix: string
  let hasApiPrefix: boolean
  if (typeof window !== 'undefined') {
    if (localStorage === null || localStorage.getItem('strapiPrefix') === null) {
      apiPrefix = ''
      hasApiPrefix = false
    } else {
      apiPrefix = localStorage.getItem('strapiPrefix') as string
      hasApiPrefix = true
    }
  } else {
    apiPrefix = ''
    hasApiPrefix = false
  }

  const setApiPrefix = (apiPrefix: string): void => {
    localStorage.setItem('strapiPrefix', apiPrefix)
    window.location.reload()
  }

  return {
    apiPrefix,
    setApiPrefix,
    hasApiPrefix
  }
}
