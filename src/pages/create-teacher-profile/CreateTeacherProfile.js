import React, { Fragment, useState, useEffect } from 'react'
import FsLightbox from 'fslightbox-react'
import { FaPlay } from 'react-icons/fa'
import { Grid, Box, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import usePrompt from '../../hooks/user-prompt'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import GeneralInformation from '../../components/application-section/GeneralInformation'
import ExperienceInfomation from '../../components/application-section/ExperienceInfomation'

const CreateTeacherProfile = () => {
  const [togglerIntroVideo, setTogglerIntroVideo] = useState(false)
  const videoLink = ['https://www.youtube.com/watch?v=pNje3bWz7V8']

  return (
    <Fragment>
      <SEO title="Create Profile" />
      <Layout compactFooter>
        <Container maxWidth="lg" className="profile-form">
          <Typography variant="h4" className="profile-page-title">
            Apply to Teach
          </Typography>
          <Box id="step-1" className="profile__section">
            <Typography variant="h4" className="profile__section-title">
              Step 1: Learn about&nbsp;
              <span style={{ color: '#525fe1' }}>LetMeet</span>
            </Typography>
            <Typography
              variant="subtitle"
              className="profile__section-subtitle"
            >
              This video explains the fundamentals of being a teacher on
              LetMeet. You can also learn more about teaching with the Teacher
              Guide
            </Typography>
            <div className="profile__section__thumbnail">
              <div className="video-gallery-1">
                <div className="thumbnail video-popup-wrapper">
                  <img
                    className="radius-small w-100"
                    src={`${process.env.PUBLIC_URL}./images/videopopup/intro-thumbnail.png`}
                    alt="LetMeet Thumbnail Introduce Video"
                  />
                  <button
                    className="video-play-btn with-animation position-to-top video-popup-activation btn-secondary-color size-80"
                    onClick={() => setTogglerIntroVideo(!togglerIntroVideo)}
                  >
                    <span>
                      <FaPlay className="play-icon" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Box>
          <Box id="step-2" className="profile__section">
            <Typography variant="h4" className="profile__section-title">
              Step 2: Fill out your application
            </Typography>
            <Typography
              variant="subtitle"
              className="profile__section-subtitle"
            >
              All fields are required. While we ask about professional teaching
              experience, it's not a requirement to teach on LetMeet. At this
              time, you must be based in the Viet Nam to teach on LetMeet.
            </Typography>
            <Container maxWidth="lg">
              {/* Intro and tutorial section */}
              <Box className="profile-box">
                <Box className="profile-box__content">
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      md={9}
                      order={{ xs: 2, md: 1 }}
                      className="profile-box__content-left"
                    >
                      <Box>
                        <Typography
                          className="profile__block-title"
                          variant="h5"
                          sx={{ lineHeight: '30px' }}
                        >
                          Hi <strong>Tri Bui</strong>, glad you here with us.
                          <br />
                          Please feel free at this step, your information will
                          not be shared
                        </Typography>
                        <Typography className="profile__block-subtitle">
                          Make any edits you want. You can make more changes
                          after it's live.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
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
              <GeneralInformation />
              {/* Teach experience section */}
              <ExperienceInfomation />
            </Container>
          </Box>
          <Box id="step-3" className="profile__section mt--40">
            <Typography variant="h4" className="profile__section-title">
              Step 3: Tell us about your classes
            </Typography>
            <Container maxWidth="lg">
              <Box className="profile-box">
                <Box className="profile-box__content">Hello again</Box>
              </Box>
            </Container>
          </Box>
          <Box id="step-4" className="profile__section mt--40">
            <Typography variant="h4" className="profile__section-title">
              Step 4: Teach or explain us something!
            </Typography>
            <Container maxWidth="lg">
              <Box className="profile-box">
                <Box className="profile-box__content">Hello again</Box>
              </Box>
            </Container>
          </Box>
        </Container>
      </Layout>
      <FsLightbox
        toggler={togglerIntroVideo}
        sources={videoLink}
        maxYoutubeVideoDimensions={{ width: 900, height: 550 }}
      />
    </Fragment>
  )
}

export default CreateTeacherProfile
