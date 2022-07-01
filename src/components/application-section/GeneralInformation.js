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

const GeneralInformation = () => {
  return (
    <Box className="profile-box">
      <Box className="profile-box__header">
        <Typography variant="h5" fontSize="22px" fontWeight={600}>
          General Information
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: '#E0E0E0' }} />
      <Box className="profile-box__content">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <Box className="profile-box__avatar">
                <Avatar
                  src={CloneAvatar}
                  sx={{
                    height: 100,
                    width: 100,
                    mb: 2
                  }}
                />
                <Button className="profile-box__avatar-btn">
                  <input name="file" type="file" accept="image/*" hidden />
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
                    htmlFor="full-name"
                    className="basic-info__input-label"
                  >
                    Full Name
                    <Tooltip title="This will only be visible to our team, and cannot be edited later">
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="full-name"
                    type="text"
                    name="fullName"
                    placeholder="Type here"
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
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default GeneralInformation
