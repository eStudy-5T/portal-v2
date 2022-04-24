import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// i18n
import { useTranslation } from 'react-i18next'

// Validators
import { getValidationHelperText } from '../../utils/helpers/validation-helper'
import { validatePassword } from '../../utils/validators/field-validators'

// Services
import authService from '../../services/auth-service'

function ResetPasswordForm() {
  const [email, setEmail] = useState()
  const [token, setToken] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t: translation } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    if (email && token) {
      return
    }

    setEmail(searchParams.get('email'))
    setToken(searchParams.get('token'))
    searchParams.delete('email')
    searchParams.delete('token')
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams, email, token])

  const onSubmit = (data) => {
    setIsLoading(true)
    authService.resetPassword(email, token, data.password)
      .then(() => {
        toast.success(translation('auth.resetPasswordSuccess'));
        navigate('/login')
      })
      .catch(() => {
        toast.error(translation('auth.resetPasswordFail'))
        setIsLoading(false);
      })
  }

  return (
    <div className="login-form-box bg-color-white">
      <h3 className="mb-30 text-center fs-35 mt--30">
        {translation('auth.resetPassword')}
      </h3>
      <form className="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box mb--30">
          <input
            className={errors.password && 'input-error'}
            type="password"
            placeholder={translation('auth.password')}
            autoComplete="new-password"
            {...register('password', {
              required: 'error.emptyField',
              validate: { validatePassword }
            })}
            disabled={isLoading}
          />
          <small>{translation(getValidationHelperText(errors.password))}</small>
        </div>
        <div className="input-box mb--30">
          <input
            className={errors.confirmPassword && 'input-error'}
            type="password"
            placeholder={translation('auth.enterPasswordAgain')}
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'error.emptyField',
              validate: {
                matchPassword: (data) =>
                  data === getValues('password')
                    ? true
                    : 'error.invalidConfirmPassword'
              }
            })}
            disabled={isLoading}
          />
          <small>{translation(getValidationHelperText(errors.confirmPassword))}</small>
        </div>
        <button
          className="rn-btn edu-btn w-100 mb--30"
          type="submit"
          disabled={isLoading}
        >
          <span>{translation('auth.resetPassword')}</span>
        </button>
      </form>
    </div>
  )
}

export default ResetPasswordForm
