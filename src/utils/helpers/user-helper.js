import Cookies from 'js-cookie'

export const logOutUser = () => {
  localStorage.removeItem('currentUrl')
  localStorage.removeItem('currentUser')
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
}
