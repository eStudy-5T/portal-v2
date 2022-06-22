import { useState } from 'react'
import { useDispatch } from 'react-redux'
// MUI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { userActions } from '../../../../redux/store/user-info'
import userService from '../../../../../src/services/user-service'
import { updateUserInfoFormValidator } from '../../../../utils/validators/form-validators'
import { NATIONALITIES } from '../../../../utils/constants/misc'
import { toast } from 'react-toastify'

const AccountDetails = (props) => {
  const { t: translation } = useTranslation()
  const dispatch = useDispatch()
  const [userInfoValues, setUserInfoValues] = useState(props.info)

  const [errorMsg, setErrorMsg] = useState(null)
  const [isAppLoading, setIsAppLoading] = useState(false)
  const [isSaveable, setIsSaveable] = useState(false)

  const currentUserId = localStorage.getItem('currentUserId')

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const handleChange = (event) => {
    setIsSaveable(true)
    setUserInfoValues({
      ...userInfoValues,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      dateOfBirth: data.get('dateOfBirth'),
      mobilePhone: data.get('mobilePhone'),
      nationality: data.get('nationality')
    }

    console.log(userData)

    // Check form data
    const formErrorMsg = updateUserInfoFormValidator(userData).error

    if (!formErrorMsg) {
      try {
        setIsAppLoading(true)
        await userService.update(currentUserId, userInfoValues)
        dispatch(userActions.setUserInfo(userInfoValues))
        setIsAppLoading(false)
      } catch (error) {
        setIsAppLoading(false)
        setErrorMsg(error)
      }
    } else {
      setErrorMsg(formErrorMsg)
      toast.error(formErrorMsg)
    }
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit} {...props}>
      <Card
        sx={{
          border: 'var(--border-width) solid var(--color-border)',
          borderRadius: 'var(--radius)'
        }}
      >
        <CardHeader
          subheader={translation('accountSetting.theInformationCanBeEdited')}
          title={translation('accountSetting.profile')}
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
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={translation('accountSetting.firstName')}
                name="firstName"
                onChange={handleChange}
                required
                value={userInfoValues.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={translation('accountSetting.lastName')}
                name="lastName"
                onChange={handleChange}
                required
                value={userInfoValues.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={translation('accountSetting.dateOfBirth')}
                InputLabelProps={{ shrink: true }}
                name="dateOfBirth"
                onChange={handleChange}
                type="date"
                required
                defaultValue={
                  userInfoValues.dateOfBirth ? formatDate(userInfoValues.dateOfBirth) : ''
                }
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={translation('accountSetting.mobilePhone')}
                InputLabelProps={{ shrink: true }}
                name="mobilePhone"
                onChange={handleChange}
                type="number"
                value={userInfoValues.mobilePhone || ''}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={translation('accountSetting.nationality')}
                name="nationality"
                onChange={handleChange}
                required
                select
                value={userInfoValues.nationality || ''}
                variant="outlined"
              >
                {NATIONALITIES.map((nation) => (
                  <MenuItem key={nation.key} value={nation.value}>
                    <Typography variant="body1">
                      {translation(`nationalities.${nation.key}`)}
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label={translation('courseDetails.grade')}
                  name="grade"
                  onChange={handleChange}
                  required
                  select
                  value={userInfoValues.grade || ''}
                  variant="outlined"
                >
                  {GRADES.map((option) => (
                    <MenuItem key={option.key} value={option.value}>
                      <Typography variant="body1">
                        {translation(option.value)}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" >Description</Typography>
                <CKEditor
                  initData={userInfoValues.description || translation('accountSetting.descriptionPlaceholder')}
                  data={userInfoValues.description}
                  onChange={(event) => {
                    dispatch(
                      userActions.setUserInfo({
                        ...userInfoValues,
                        description: event.editor.getData()
                      })
                    )
                  }}
                />
              </Grid> */}
          </Grid>
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
            type="submit"
            variant="contained"
            disabled={!isSaveable}
          >
            {translation('accountSetting.saveDetails')}
          </Button>
        </Box>
      </Card>
    </form>
  )
}

export default AccountDetails
