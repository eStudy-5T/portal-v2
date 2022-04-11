import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../redux/store/user-info'

const useAuthenticate = (shouldAuthenticated = null) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.userInfo.isAuthenticated)

  if ([true, false].includes(shouldAuthenticated)) {
    dispatch(userActions.setAuthentication(shouldAuthenticated))
  }

  return isAuthenticated
}

export default useAuthenticate
