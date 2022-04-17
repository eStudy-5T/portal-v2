import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../redux/store/user-info'

const useVerify = (willUseChange = null) => {
  const dispatch = useDispatch()
  const isVerified = useSelector((state) => state.userInfo.isVerified)

  const changeVerification = (shouldVerified) => {
    if ([true, false].includes(shouldVerified)) {
      dispatch(userActions.setVerification(shouldVerified))
    }
  }

  return willUseChange ? [isVerified, changeVerification] : isVerified
}

export default useVerify
