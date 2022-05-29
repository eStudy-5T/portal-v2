import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../redux/store/user-info'

const useAuthenticate = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.userInfo.isAuthenticated)

  const changeAuthentication = (shouldAuthenticated) => {
    if ([true, false].includes(shouldAuthenticated)) {
      dispatch(userActions.setAuthentication(shouldAuthenticated))
    }
  }

  return [isAuthenticated, changeAuthentication]
}

export default useAuthenticate
