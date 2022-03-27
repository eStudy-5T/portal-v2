import Cookies from 'js-cookie'

export const authHeader = () => {
  const userToken = Cookies.get('access_token')

  if (userToken) {
    return { Authorization: `Bearer ${userToken}` }
  }
  return null
}
