import React from 'react'
import {
  Container,
  Button,
  Avatar,
  Box,
  Typography,
  Divider,
  Grid,
  InputLabel,
  Tooltip
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CloneAvatar from '../../assets/images/clone.png'
import { resizeImage } from '../../utils/helpers/image-helper'

const GeneralInformation = () => {
  const onChangeAvatar = async (event) => {
    event.preventDefault()
    try {
      const file = event.target.files[0]
      const resizedImage = await resizeImage(file, 256, 256, file.type)
      console.log('resizedImage', resizedImage)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box className="profile-box">
      <Box className="profile-box__header">
        <Typography variant="h5" fontSize="22px" fontWeight={600}>
          General Information
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: '#E0E0E0' }} />
      <Box className="profile-box__content">
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <Box className="profile-box__avatar">
                <Avatar
                  src={CloneAvatar}
                  sx={{
                    height: 200,
                    width: 200,
                    mb: 2
                  }}
                />
                <Button component="label" className="profile-box__avatar-btn">
                  <input
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={onChangeAvatar}
                    hidden
                  />
                  Change Avatar
                </Button>
              </Box>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    required
                    htmlFor="public-teacher-name"
                    className="basic-info__input-label"
                  >
                    Public Teacher Name
                    <Tooltip title="This will be seen on your class listings and teacher profile. It can be edited later">
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="public-teacher-name"
                    type="text"
                    name=" publicTeacherName"
                    placeholder="Type here"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    required
                    htmlFor="email"
                    className="basic-info__input-label"
                  >
                    Email
                    <Tooltip title="This cannot be edited later">
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="abc@domain-mail.com"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    required
                    htmlFor="phone-number"
                    className="basic-info__input-label"
                  >
                    Phone number
                    <Tooltip title="This is only used by LetMeet when we need to contact you">
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="phone-number"
                    type="number"
                    name=" publicTeacherName"
                    placeholder="+84"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    required
                    htmlFor="location"
                    className="basic-info__input-label"
                  >
                    Location
                    <Tooltip title="City, state, and country">
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="location"
                    type="text"
                    name="fullName"
                    placeholder="Type here"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel
                    htmlFor="online-profiles"
                    className="basic-info__input-label"
                  >
                    (Optional) Online profile
                    <Tooltip title="Professional website, Facebook page, or LinkedIn profile. This helps describe your experience and expertise">
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="online-profiles"
                    type="text"
                    name="onlineProfile"
                    placeholder="Type here"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={12}>
              <InputLabel
                htmlFor="course-description"
                className="basic-info__input-label"
                required
              >
                Short description about yourself
                <Tooltip title="This assist students in getting to know you better">
                  <HelpOutlineIcon
                    sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                  />
                </Tooltip>
              </InputLabel>
              <textarea
                id="course-description"
                name="description"
                rows="3"
                required
              ></textarea>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default GeneralInformation
