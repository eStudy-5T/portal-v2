import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

// Mui Components
import { Box } from '@mui/system'

// i18n
import { useTranslation } from 'react-i18next'

// Reducers
import { userActions } from '../../redux/store/user-info'

// Services
import authService from '../../services/auth-service'

// Validators
import { validateEmail } from '../../utils/validators/field-validators'
import { getValidationHelperText } from '../../utils/helpers/validation-helper'

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { t: translation } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data) => {
    setIsLoading(true)
    authService
      .login(data)
      .then(({ data: userInfo }) => {
        localStorage.setItem('currentUser', JSON.stringify(userInfo))
        localStorage.setItem('currentUserId', userInfo.userId)
        localStorage.setItem('loginTimestamp', Date.now() + 86400000) // 1 day
        dispatch(userActions.setUserInfo(userInfo))
        navigate('/')
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const loginWithGoogle = () => {
    const googleLoginURL = `${process.env.REACT_APP_API_HOST}/api/auth/google`
    window.open(googleLoginURL, '_self')
  }

  const loginWithFacebook = () => {
    const facebookLoginURL = `${process.env.REACT_APP_API_HOST}/api/auth/facebook`
    window.open(facebookLoginURL, '_self')
  }

  return (
    <div className="login-form-box bg-color-white">
      <h3 className="mb-30 text-center fs-35">{translation('auth.login')}</h3>
      <form className="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box mb--30">
          <input
            className={errors.email && 'input-error'}
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'error.emptyField',
              validate: { validateEmail }
            })}
            disabled={isLoading}
          />
          <small>{translation(getValidationHelperText(errors.email))}</small>
        </div>
        <div className="input-box mb--30">
          <input
            className={errors.password && 'input-error'}
            type="password"
            placeholder={translation('auth.password')}
            {...register('password', {
              required: 'error.emptyField'
            })}
            disabled={isLoading}
          />
        </div>
        {/* <div className="comment-form-consent input-box mb--30">
          <input id="checkbox-1" type="checkbox" />
          <label htmlFor="checkbox-1">Remember Me</label>
        </div> */}
        <button
          className="rn-btn edu-btn w-100 mb--30"
          type="submit"
          disabled={isLoading}
        >
          <span>{translation('auth.login')}</span>
        </button>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 3
          }}
        >
          <button
            className="rn-btn edu-btn btn-danger w-100 mb--30"
            type="button"
            disabled={isLoading}
            onClick={loginWithGoogle}
          >
            <i className="ri-google-line"></i>
            &nbsp; Google
          </button>

          <button
            className="rn-btn edu-btn btn-facebook w-100 mb--30"
            type="button"
            disabled={isLoading}
            onClick={loginWithFacebook}
          >
            <i className="ri-facebook-circle-fill"></i>
            &nbsp; Facebook
          </button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div className="input-box mb--20">
            <Link to="/forgot-password">
              {translation('auth.forgotPassword')}
            </Link>
          </div>
          <div className="input-box">
            <Link to="/register">{translation('auth.noAccountYet')}</Link>
          </div>
        </Box>
      </form>
    </div>
  )
}

export default LoginForm
