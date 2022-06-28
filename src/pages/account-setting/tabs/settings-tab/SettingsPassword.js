import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField
} from '@mui/material'

import { useTranslation } from 'react-i18next'

export const SettingsPassword = (props) => {
  const { t: translation } = useTranslation()
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form {...props}>
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
            sx={{ textTransform: 'capitalize' }}
          >
            {translation('accountSetting.update')}
          </Button>
        </Box>
      </Card>
    </form>
  )
}
