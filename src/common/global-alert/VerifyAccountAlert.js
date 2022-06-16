import React, { useState } from 'react'
import useAuthenticate from '../../hooks/use-authenticate'
import useVerify from '../../hooks/use-verify'
import AlertWrapper from './AlertWrapper'
import { toast } from 'react-toastify'

// Mui Components
import { Grid } from '@mui/material'

// i18n
import { useTranslation } from 'react-i18next'

// Services
import authService from '../../services/auth-service'

const VerifyAccountAlert = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated] = useAuthenticate()
  const [isVerified] = useVerify()

  const { t: translation } = useTranslation()

  const resendVerifyEmail = () => {
    setIsLoading(true)
    authService
      .resendVerifyEmail()
      .then(() => {
        toast.success(translation('auth.resendVerifyEmailSuccess'))
      })
      .catch(() => {
        toast.error(translation('auth.resendVerifyEmailFail'))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    !isVerified &&
    isAuthenticated && (
      <AlertWrapper>
        {/* <div className="verify-account-alert">

        </div> */}
        <Grid
          className="verify-account-alert"
          container
          alignItems="center"
          justifyContent="center"
        >
          <p>{translation('auth.verifyAccountAlert')}</p>
          <button
            className="btn btn-transparent sm-size"
            onClick={resendVerifyEmail}
            disabled={isLoading}
          >
            {translation('auth.resendVerifyEmail')}
          </button>
        </Grid>
      </AlertWrapper>
    )
  )
}

export default VerifyAccountAlert
