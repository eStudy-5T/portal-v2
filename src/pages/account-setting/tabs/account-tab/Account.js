import { useState } from 'react'
import { useDispatch } from 'react-redux'
// MUI
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { userActions } from '../../../../redux/store/user-info'
import userService from '../../../../../src/services/user-service'
import { resizeImage } from '../../../../utils/helpers/image-helper'
import CloneAvatar from '../../../../assets/images/clone.png'

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
    <Card
      sx={{
        border: 'var(--border-width) solid var(--color-border)',
        borderRadius: 'var(--radius)'
      }}
      {...props}
    >
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
          <Typography
            color="var(--color-primary)"
            fontWeight="bold"
            variant="h5"
          >
            {userInfoValues.firstName + ' ' + userInfoValues.lastName}
          </Typography>
          <Typography color="var(--color-body)" gutterBottom variant="body1">
            {`${userInfoValues.email}`}
          </Typography>
          <Typography color="var(--color-secondary)" variant="body2" fontStyle="italic">
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

export default Account
