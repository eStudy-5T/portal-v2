import Cookies from 'js-cookie'
import store from '../../redux'
import { userActions } from '../../redux/store/user-info'
import authService from '../../services/auth-service'

export const logOutUser = () => {
  localStorage.removeItem('currentUrl')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('currentUserId')
  localStorage.removeItem('loginTimestamp')
  localStorage.removeItem('language')
  Cookies.remove('csrf_token')
  store.dispatch(userActions.logOutUser())
  return authService.logout()
}
