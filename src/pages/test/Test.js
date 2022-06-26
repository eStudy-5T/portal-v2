import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../redux/store/user-info'
import GoogleLogin from 'react-google-login'
import authService from '../../services/auth-service'
import { Button } from '@mui/material'

const Test = () => {
  const dispatch = useDispatch()
  const doesGoogleGrantAccess = useSelector(
    (state) => state.userInfo.doesGoogleGrantAccess
  )

  const responseGoogle = (res) => {
    if (!res?.code) {
      return
    }

    authService.generateGoogleRefreshToken(res.code).then(({ data }) => {
      const { doesGoogleGrantAccess: tempVariable } = data
      dispatch(userActions.setGoogleGrantAccess(tempVariable))
    })
  }

  return (
    <div className="ml--10">
      <h5>Ví dụ trang edit khoá học</h5>
      <p>
        Nhân Login Google Meet để cấp letmeet quyền truy cập vào calendar của
        người dùng; Sau đó người dùng có thể generate google meet link
      </p>

      <p>
        Nhấn Generate Google Meet Link để sinh ra google meet link cho khoá học
      </p>
      <p>
        Nhấn Refresh Google Meet attendee list vì lí do gì đó, lúc học sinh
        enroll, ko được ghi vào danh sách người tham gia event của google meet
        (người nào có trong danh sách này, mà email là tài khoản google, sẽ truy
        cập Meet trực tuyến mà ko cần host cho phép)
      </p>

      <p>
        Generate Meet Link hay Refresh attendee list thất bại (quyền truy cập
        vào calendar bị revoked), thì
        dispatch(userActions.setGoogleGrantAccess(false))
      </p>
      {!doesGoogleGrantAccess && (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login Google Meet"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
          responseType="code"
          accessType="offline"
          prompt="consent"
          scope="https://www.googleapis.com/auth/calendar"
        />
      )}

      {doesGoogleGrantAccess && (
        <>
          <Button>Generate Google Meet Link</Button>
          <Button>Refresh Google Meet attendee list</Button>
        </>
      )}
    </div>
  )
}

export default Test
