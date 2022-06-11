import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// MUI
import {
  Avatar,
  Box,
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { CKEditor } from 'ckeditor4-react'
import { userActions } from '../../redux/store/user-info'
import userService from '../../../src/services/user-service'
import { resizeImage } from '../../utils/helpers/image-helper'
import { updateUserInfoFormValidator } from '../../utils/validators/form-validators'
import { GRADES, NATIONALITIES } from '../../utils/constants/misc'

import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import CloneAvatar from '../../assets/images/clone.png'

const Account = (props) => {
  const { t: translation } = useTranslation()
  const dispatch = useDispatch()
  const [userInfoValues, setUserInfoValues] = useState(props.info)

  const onChangeAvatar = async (event) => {
    event.preventDefault()
    try {
      const file = event.target.files[0]
      const resizedImage = await resizeImage(file, 256, 256, file.type)
      const response = await userService.uploadAvatar(resizedImage)
      const userInfoWithNewAvatar = {
        ...userInfoValues,
        avatar: response.data.avatar
      }
      setUserInfoValues(userInfoWithNewAvatar)
      dispatch(userActions.setUserInfo(userInfoWithNewAvatar))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card sx={{border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)'}} {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={userInfoValues.avatar || CloneAvatar}
            sx={{
              height: 128,
              mb: 2,
              width: 128
            }}
          />
          <Typography color="var(--color-primary)" fontWeight='bold' variant="h5">
            {userInfoValues.firstName + ' ' + userInfoValues.lastName}
          </Typography>
          <Typography color="var(--color-body)" gutterBottom variant="body1">
            {`${userInfoValues.email}`}
          </Typography>
          <Typography
            variant="body2"
            fontStyle='italic'
          >
            {`${
              userInfoValues.isAdmin
                ? 'Administrator'
                : userInfoValues.isVerifiedToTeach
                ? 'Teacher'
                : 'Student'
            }`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          component="label"
          sx={{
            borderRadius: '5px',
            display: 'inline-block',
            color: 'var(--color-primary)',
            background: 'var(--color-white)',
            padding: '3px 12px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-primary)',
            border: 'var(--border-width) solid var(--color-primary)',
            '&:hover': {
              background: 'var(--color-secondary)',
              borderColor: 'var(--color-secondary)',
              color: 'var(--color-white)'
            }
          }}
        >
          <input
            name="file"
            type="file"
            accept="image/*"
            onChange={onChangeAvatar}
            hidden
          />
          {translation('accountSetting.changeAvatar')}
        </Button>
      </CardActions>
    </Card>
  )
}

const AccountDetails = (props) => {
  const { t: translation } = useTranslation()
  const dispatch = useDispatch()
  const [userInfoValues, setUserInfoValues] = useState(props.info)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isAppLoading, setIsAppLoading] = useState(false)

  const currentUserId = localStorage.getItem('currentUserId')

  function formatDateTimeToYYYYMMDD(date) {
    const d = new Date(date || Date.now())

    const day = ('0' + d.getDate()).slice(-2)
    const month = ('0' + (d.getMonth() + 1)).slice(-2)
    const year = d.getFullYear()

    return year + '-' + month + '-' + day
  }

  const handleChange = (event) => {
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
      lastName: data.get('lastName')
    }

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
    }
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit} {...props}>
      <Card sx={{border: 'var(--border-width) solid var(--color-border)', borderRadius:'var(--radius)'}} >
        <CardHeader
          subheader={translation('accountSetting.theInformationCanBeEdited')}
          title={translation('accountSetting.profile')}
          sx={{
            '& .MuiCardHeader-title': {
              color: 'var(--color-primary)',
            },
            '& .MuiCardHeader-subheader': {
              color: 'var(--color-secondary)',
            },
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
                name="dateOfBirth"
                onChange={handleChange}
                type="date"
                required
                defaultValue={formatDateTimeToYYYYMMDD(
                  '2022-06-10T06:57:10.750Z'
                )}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={translation('accountSetting.mobilePhone')}
                name="mobilePhone"
                onChange={handleChange}
                type="number"
                defaultValue={userInfoValues.mobilePhone}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
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
              <CKEditor
                initData={userInfoValues.description}
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
            </Grid>
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
          <Button className="edu-btn btn-small" variant="contained">
            {translation('accountSetting.saveDetails')}
          </Button>
        </Box>
      </Card>
    </form>
  )
}

const AccountSetting = () => {
  const userInfo = useSelector((state) => state.userInfo)
  const { t: translation } = useTranslation()
  return (
    <>
      <SEO title={translation('dropdown.accountSettings')} />
      <Layout>
        <BreadcrumbOne title={translation('dropdown.accountSettings')} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <Account info={userInfo} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountDetails info={userInfo} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  )
}

export default AccountSetting
