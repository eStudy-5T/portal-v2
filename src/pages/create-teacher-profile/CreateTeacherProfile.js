import React, { Fragment, useState, useEffect } from 'react'
import FsLightbox from 'fslightbox-react'
import { FaPlay } from 'react-icons/fa'
import { Grid, Box, Container, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import usePrompt from '../../hooks/user-prompt'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import GeneralInformation from '../../components/application-section/GeneralInformation'
import ExperienceInformation from '../../components/application-section/ExperienceInformation'
import ClassInformation from '../../components/application-section/ClassInformation'
import SampleTeach from '../../components/application-section/SampleTeach'
import {
  validateBasicForm,
  validateAdvancedForm
} from '../../utils/validators/create-profile-validate'

const initializeTeacherBasicInfo = {
  teacherAvatar: null,
  publicTeacherName: '',
  email: '',
  phoneNumber: 0,
  location: '',
  onlineProfile: '',
  teacherSelfDescription: ''
}

const initializeTeacherAdvancedInfo = {
  experiences: [],
  classGeneralInformation: '',
  classPlan: '',
  sampleTeaching: ''
}

const CreateTeacherProfile = () => {
  const [isBlocking, setIsBlocking] = useState(false)
  const [isValidToSubmit, setValidToSubmit] = useState(false)
  const [teacherBasicInfo, setTeacherBasicInfo] = useState(
    initializeTeacherBasicInfo
  )
  const [teacherAdvancedInfo, setTeacherAdvancedInfo] = useState(
    initializeTeacherAdvancedInfo
  )
  const [togglerIntroVideo, setTogglerIntroVideo] = useState(false)
  const videoLink = ['https://www.youtube.com/watch?v=pNje3bWz7V8']

  usePrompt('Reload site? Changes you made may not be saved.', isBlocking)

  useEffect(() => {
    const basicInfoValid = validateBasicForm(teacherBasicInfo)
    const advancedInfoValid = validateAdvancedForm(teacherAdvancedInfo)
    setValidToSubmit(basicInfoValid && advancedInfoValid)
  }, [teacherBasicInfo, teacherAdvancedInfo])

  const handleChangeBasicInfo = (value, field) => {
    setIsBlocking(true)
    setTeacherBasicInfo((prevTeacherBasicInfo) => ({
      ...prevTeacherBasicInfo,
      [field]: value || ''
    }))
  }

  const handleChangeAdvancedInfo = (value, field) => {
    setIsBlocking(true)
    setTeacherAdvancedInfo((prevTeacherAdvancedInfo) => ({
      ...prevTeacherAdvancedInfo,
      [field]: value
    }))
  }

  const handleAddExperiences = (data) => {
    setIsBlocking(true)
    const experience = {
      id: (
        (teacherAdvancedInfo.experiences
          ? teacherAdvancedInfo.experiences.length
          : 0) + 1
      ).toString(),
      ...data
    }
    let experiences = teacherAdvancedInfo.experiences
      ? [...teacherAdvancedInfo.experiences]
      : []
    experiences.push(experience)
    setTeacherAdvancedInfo((prevTeacherAdvancedInfo) => ({
      ...prevTeacherAdvancedInfo,
      experiences: experiences
    }))
  }

  const handleEditExperience = (data) => {
    setIsBlocking(true)
    if (
      teacherAdvancedInfo.experiences &&
      !!teacherAdvancedInfo.experiences.length
    ) {
      const updatedData = teacherAdvancedInfo.experiences.map((exp) => {
        return exp.id.toString() === data.id.toString() ? data : exp
      })

      setTeacherAdvancedInfo((prevTeacherAdvancedInfo) => ({
        ...prevTeacherAdvancedInfo,
        experiences: updatedData
      }))
    }
  }

  const handleDeleteExperience = (id) => {
    if (!teacherAdvancedInfo.experiences?.length) {
      return
    }
    const _experiences = [...teacherAdvancedInfo.experiences]
    const experiencesAfterRemove = _experiences.filter(
      (exp) => exp.id.toString() !== id.toString()
    )

    if (!experiencesAfterRemove.length) {
      setIsBlocking(false)
    }

    setTeacherAdvancedInfo((prevTeacherAdvancedInfo) => ({
      ...prevTeacherAdvancedInfo,
      experiences: experiencesAfterRemove
    }))
  }

  const handleSubmitProfile = () => {
    setIsBlocking(false)
  }

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
              <GeneralInformation
                basicInfo={teacherBasicInfo}
                handleChangeBasicInfo={handleChangeBasicInfo}
              />
              {/* Teach experience section */}
              <ExperienceInformation
                experiences={teacherAdvancedInfo.experiences}
                handleAddExperiences={handleAddExperiences}
                handleDeleteExperience={handleDeleteExperience}
                handleEditExperience={handleEditExperience}
                handleChangeAdvancedInfo={handleChangeAdvancedInfo}
              />
            </Container>
          </Box>
          <Box id="step-3" className="profile__section mt--40">
            <Typography variant="h4" className="profile__section-title">
              Step 3: Tell us about your classes
            </Typography>
            <Typography
              variant="subtitle"
              className="profile__section-subtitle"
            >
              We'd like to learn more about your class, please fill out the
              fields below.
            </Typography>
            <ClassInformation
              teacherAdvancedInfo={teacherAdvancedInfo}
              handleChangeAdvancedInfo={handleChangeAdvancedInfo}
            />
          </Box>
          <Box id="step-4" className="profile__section mt--40">
            <Typography variant="h4" className="profile__section-title">
              Step 4: Teach or explain us something!
            </Typography>
            <SampleTeach handleChangeAdvancedInfo={handleChangeAdvancedInfo} />
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
              width: '100%'
            }}
          >
            <button
              className="profile__submit"
              disabled={!isValidToSubmit}
              onClick={handleSubmitProfile}
            >
              Submit Profile
            </button>
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
