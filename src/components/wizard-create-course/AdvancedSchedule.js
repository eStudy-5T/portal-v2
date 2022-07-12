import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, InputLabel, Button, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../redux/store/user-info'
import GoogleLogin from 'react-google-login'
import authService from '../../services/auth-service'

const AdvancedSchedule = () => {
  const { t: translation } = useTranslation()
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
    <Fragment>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Grid container component="main" spacing={1}>
          <Grid item xs={12} md={12}>
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
                <Button
                  component="label"
                  className="profile-box__avatar-btn"
                  sx={{ mr: 1 }}
                >
                  Generate Google Meet Link
                </Button>
                <Button component="label" className="profile-box__avatar-btn">
                  Refresh Google Meet attendee list
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default AdvancedSchedule
