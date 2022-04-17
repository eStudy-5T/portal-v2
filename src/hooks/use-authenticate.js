import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../redux/store/user-info'

const useAuthenticate = (willUseChange = null) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.userInfo.isAuthenticated)

  const changeAuthentication = (shouldAuthenticated) => {
    if ([true, false].includes(shouldAuthenticated)) {
      dispatch(userActions.setAuthentication(shouldAuthenticated))
    }
  }

  return willUseChange
    ? [isAuthenticated, changeAuthentication]
    : isAuthenticated
}

export default useAuthenticate
