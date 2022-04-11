import Cookies from 'js-cookie'

export const authHeader = () => {
  const csrfToken = Cookies.get('csrf_token')

  if (csrfToken) {
    return { 'x-csrf-token': csrfToken }
  }
  return null
}
