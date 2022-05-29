import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../redux/store/user-info'

const useVerify = () => {
  const dispatch = useDispatch()
  const isVerified = useSelector((state) => state.userInfo.isVerified)

  const changeVerification = (shouldVerified) => {
    if ([true, false].includes(shouldVerified)) {
      dispatch(userActions.setVerification(shouldVerified))
    }
  }

  return [isVerified, changeVerification]
}

export default useVerify
