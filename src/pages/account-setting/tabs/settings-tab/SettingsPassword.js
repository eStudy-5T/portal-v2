import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  TextField
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { logOutUser } from '../../../../utils/helpers/user-helper'
import { userActions } from '../../../../redux/store/user-info'
import userService from '../../../../../src/services/user-service'
import { changePasswordValidator } from '../../../../utils/validators/form-validators'
import { toast } from 'react-toastify'

export const SettingsPassword = (props) => {
  const { t: translation } = useTranslation()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isSaveable, setIsSaveable] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const currentUserId = localStorage.getItem('currentUserId')

  const handleChange = (event) => {
    setIsSaveable(true)
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const signOut = () => {
    dispatch(userActions.logOutUser())
    logOutUser()
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const userData = {
      currentPassword: data.get('currentPassword'),
      newPassword: data.get('newPassword'),
      confirmPassword: data.get('confirmPassword')
    }

    // Check form data
    const formErrorMsg = changePasswordValidator(userData).error

    if (!formErrorMsg) {
      setIsLoading(true)
      try {
        const resultStatus = (
          await userService.changePassword(currentUserId, userData)
        ).status
        if (resultStatus === 200) {
          setIsSaveable(false)
          toast.success('Password changed successfully')
          signOut()
        }
        console.log(resultStatus)
      } catch (error) {
        toast.error(error)
        setErrorMsg(error)
      }
    } else {
      toast.error(formErrorMsg)
      setErrorMsg(formErrorMsg)
    }
    setIsLoading(false)
  }

  return (
    <form autoComplete="off" noValidate onSubmit={onSubmit} {...props}>
      <Card
        sx={{
          border: 'var(--border-width) solid var(--color-border)',
          borderRadius: 'var(--radius)'
        }}
      >
        <CardHeader
          subheader={
            translation('accountSetting.update') +
            ' ' +
            translation('accountSetting.password')
          }
          title={translation('auth.password')}
          sx={{
            '& .MuiCardHeader-title': {
              color: 'var(--color-primary)'
            },
            '& .MuiCardHeader-subheader': {
              color: 'var(--color-secondary)'
            }
          }}
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            required
            className='textField'
            label={translation('accountSetting.currentPassword')}
            margin="normal"
            id="currentPassword"
            name="currentPassword"
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            value={values.currentPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            className='textField'
            label={translation('accountSetting.newPassword')}
            margin="normal"
            id="newPassword"
            name="newPassword"
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            value={values.newPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            className='textField'
            label={translation('accountSetting.confirmPassword')}
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                disableRipple
                size="small"
                onClick={handleClickShowPassword}
                sx={{
                  '&.Mui-checked': {
                    color: 'var(--color-primary)'
                  }
                }}
              />
            }
            label={translation('accountSetting.showPassword')}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: 'small',
                color: 'var(--color-primary)'
              }
            }}
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            className="edu-btn btn-small"
            variant="contained"
            type='submit'
            disabled={!isSaveable || isLoading}
            sx={{ textTransform: 'capitalize' }}
          >
            {translation('accountSetting.update')}
            {isLoading && (
            <CircularProgress
              thickness={5}
              sx={{
                color: 'var(--color-secondary)',
                position: 'absolute',
                margin: 'auto',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                padding: 1
              }}
            />
          )}
          </Button>
        </Box>
      </Card>
    </form>
  )
}
