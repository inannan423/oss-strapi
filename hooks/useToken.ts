export default function useToken (): {
  token: string
  setToken: (token: string) => void
  hasToken: boolean
} {
  let token: string
  let hasToken: boolean
  if (typeof window !== 'undefined') {
    if (localStorage === null || localStorage.getItem('strapiToken') === null) {
      token = ''
      hasToken = false
    } else {
      token = localStorage.getItem('strapiToken') as string
      hasToken = true
    }
  } else {
    token = ''
    hasToken = false
  }

  const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('strapiToken', token)
      window.location.reload()
    }
  }

  return {
    token,
    setToken,
    hasToken
  }
}
