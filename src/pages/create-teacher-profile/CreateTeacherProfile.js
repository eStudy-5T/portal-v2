import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePrompt from '../../hooks/user-prompt'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import { Grid, Box, Container, Divider, Typography } from '@mui/material'

const CreateTeacherProfile = () => {
  return (
    <Fragment>
      <SEO title="Create Profile" />
      <Layout compactFooter>
        <Container className="profile-form">
          {/* Intro and tutorial section */}
          <Box className="profile-box">
            <Box className="profile-box__header">
              <Typography variant="h5" fontSize="22px">
                Fill out your profile
              </Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#E0E0E0' }} />
            <Box className="profile-box__content">
              <Grid container>
                <Grid
                  xs={12}
                  md={9}
                  order={{ xs: 2, md: 1 }}
                  className="profile-box__content-left"
                >
                  <Box>
                    <Typography className="profile-title" variant="h5">
                      Welcome Tri Bui, let complete profile and become our
                      LetMeet Teacher
                    </Typography>
                    <Typography className="profile-subtitle">
                      Make any edits you want, then submit your profile. You can
                      make more changes after it`s live.
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  xs={12}
                  md={3}
                  order={{ xs: 1, md: 2 }}
                  className="profile-box__content-right"
                >
                  <img
                    src="/images/instructor/profile/profile-check.svg"
                    alt="Profile checking"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* General info section */}
          <Box className="profile-box">
            <Box className="profile-box__header">
              <Typography variant="h5" fontSize="22px">
                Create Profile
              </Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#E0E0E0' }} />
            <Box className="profile-box__content">General info</Box>
          </Box>
          {/* Skill info section */}
          <Box className="profile-box">
            <Box className="profile-box__header">
              <Typography variant="h5" fontSize="22px">
                Skills
              </Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#E0E0E0' }} />
            <Box className="profile-box__content">Skill info</Box>
          </Box>
          {/* Teach experience section */}
          <Box className="profile-box">
            <Box className="profile-box__header">
              <Typography variant="h5" fontSize="22px">
                Teach Experience
              </Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#E0E0E0' }} />
            <Box className="profile-box__content">Teach Experience info</Box>
          </Box>
          {/* Education history section */}
          <Box className="profile-box">
            <Box className="profile-box__header">
              <Typography variant="h5" fontSize="22px">
                Education History
              </Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#E0E0E0' }} />
            <Box className="profile-box__content">Education History info</Box>
          </Box>
        </Container>
      </Layout>
    </Fragment>
  )
}

export default CreateTeacherProfile
