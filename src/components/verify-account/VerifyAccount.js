import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useVerify from '../../hooks/use-verify'

// Mui components
import { Grid } from '@mui/material'

// i18n
import { useTranslation } from 'react-i18next'

// Services
import authService from '../../services/auth-service'

function VerifyAccount() {
  const [verifyMessage, setVerifyMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { verifyToken } = useParams()
  const { t: translation } = useTranslation()
  const [isVerified, changeVerification] = useVerify(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (isVerified) {
      setVerifyMessage('auth.alreadyVerified')
      return
    }

    authService
      .verifyAccount(verifyToken)
      .then(() => {
        toast.success(translation('auth.verifyAccountSuccess'))
        changeVerification(true)
      })
      .catch(() => {
        setVerifyMessage('auth.verifyAccountFail')
      })
    // eslint-disable-next-line
  }, [])

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
    <div className="login-form-box bg-color-white">
      <h3 className="mb-30 text-center fs-35">
        {translation('auth.verifyAccount')}
      </h3>

      <Grid container justifyContent="center">
        <p>{translation(verifyMessage)}</p>
        {verifyMessage === 'auth.verifyAccountFail' && (
          <button
            className="btn edu-btn"
            disabled={isLoading}
            onClick={resendVerifyEmail}
          >
            {translation('auth.resendVerifyEmail')}
          </button>
        )}
      </Grid>
    </div>
  )
}

export default VerifyAccount
