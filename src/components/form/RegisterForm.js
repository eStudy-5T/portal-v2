import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// Mui Components
import { Grid } from '@mui/material'

// i18n
import { useTranslation } from 'react-i18next'

// Services
import authService from '../../services/auth-service'

// Validators
import {
  validateEmail,
  validatePassword
} from '../../utils/validators/field-validators'
import { getValidationHelperText } from '../../utils/helpers/validation-helper'

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { t: translation } = useTranslation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptPolicy: false
    }
  })

  const onSubmit = (data) => {
    if (!isValid) {
      return
    }

    setIsLoading(true)
    authService
      .register(data)
      .then(() => {
        navigate('/login')
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="login-form-box bg-color-white">
      <h3 className="mb-30 text-center fs-35">
        {translation('auth.register')}
      </h3>

      <form className="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box mb--30">
          <Grid container columnSpacing={2} rowSpacing="30px">
            <Grid item xs={12} sm={6}>
              <input
                className={errors.firstName && 'input-error'}
                type="text"
                placeholder={translation('auth.firstName')}
                autoFocus
                autoComplete="given-name"
                {...register('firstName', {
                  required: 'error.emptyField'
                })}
                disabled={isLoading}
              />
              <small>
                {translation(getValidationHelperText(errors.firstName))}
              </small>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                className={errors.lastName && 'input-error'}
                type="text"
                placeholder={translation('auth.lastName')}
                autoComplete="family-name"
                {...register('lastName', {
                  required: 'error.emptyField'
                })}
                disabled={isLoading}
              />
              <small>
                {translation(getValidationHelperText(errors.lastName))}
              </small>
            </Grid>
          </Grid>
        </div>
        <div className="input-box mb--30">
          <input
            className={errors.email && 'input-error'}
            type="email"
            placeholder="Email"
            autoComplete="email"
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
          <small>
            {translation(getValidationHelperText(errors.confirmPassword))}
          </small>
        </div>
        <div className="input-box">
          <input
            id="accept-policy"
            type="checkbox"
            {...register('acceptPolicy', {
              validate: {
                validateAcceptPolicy: (data) =>
                  Boolean(data) ? true : 'error.invalidPolicy'
              }
            })}
            disabled={isLoading}
          />
          <label htmlFor="accept-policy">
            {translation('auth.agreeToTermOfUses')}
          </label>
          <div>
            <small>
              {translation(getValidationHelperText(errors.acceptPolicy))}
            </small>
          </div>
        </div>
        <button
          className="rn-btn edu-btn w-100 mt--30"
          type="submit"
          disabled={isLoading}
        >
          <span>{translation('auth.register')}</span>
        </button>
      </form>
      <div className="input-box mt--30">
        <Link to="/login">{translation('auth.alreadyMember')}</Link>
      </div>
    </div>
  )
}

export default RegisterForm
