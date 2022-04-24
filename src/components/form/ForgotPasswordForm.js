import React, { useState } from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// i18n
import { useTranslation } from 'react-i18next'

// Validators
import { getValidationHelperText } from '../../utils/helpers/validation-helper'
import { validateEmail } from '../../utils/validators/field-validators'

// Services
import authService from '../../services/auth-service'

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { t: translation } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (data) => {
    setIsLoading(true)
    authService
      .forgotPassword(data.email)
      .then(() => {
        toast.success(translation('auth.sendForgotPasswordEmailSuccess'))
      })
      .catch(() => {
        toast.error(translation('auth.sendForgotPasswordEmailFail'))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="login-form-box bg-color-white">
      <h3 className="mb-30 text-center fs-35 mt--30">
        {translation('auth.forgotPassword')}
      </h3>
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
        <button
          className="rn-btn edu-btn w-100 mb--30"
          type="submit"
          disabled={isLoading}
        >
          <span>{translation('auth.sendEmail')}</span>
        </button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div className="input-box mb--20">
            <Link to="/login">{translation('auth.tryLoginAgain')}</Link>
          </div>
          <div className="input-box">
            <Link to="/register">{translation('auth.doNotHaveAccount')}</Link>
          </div>
        </Box>
      </form>
    </div>
  )
}

export default LoginForm
