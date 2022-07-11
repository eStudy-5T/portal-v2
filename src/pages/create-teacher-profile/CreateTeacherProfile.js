import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import FsLightbox from 'fslightbox-react'
import { FaPlay } from 'react-icons/fa'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Grid,
  Box,
  Container,
  Typography,
  Divider,
  CircularProgress,
  Tooltip
} from '@mui/material'
import usePrompt from '../../hooks/user-prompt'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import GeneralInformation from '../../components/application-section/GeneralInformation'
import ExperienceInformation from '../../components/application-section/ExperienceInformation'
import ClassInformation from '../../components/application-section/ClassInformation'
import SampleTeach from '../../components/application-section/SampleTeach'
import Loading from '../../common/loading/Loading'
import teacherProfileService from '../../services/teacher-profile'
import CustomDialog from '../../components/dialog/CustomDialog'
import { PROFILE_STATUS } from '../../utils/constants/teacher-profile'
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
  const navigate = useNavigate()
  const { t: translation } = useTranslation()
  const userInfo = useSelector((state) => state.userInfo)
  const [commentFromAdmin, setCommentFromAdmin] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [isBlocking, setIsBlocking] = useState(false)
  const [isAppLoading, setIsAppLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidToSubmit, setValidToSubmit] = useState(false)
  const [isSubmittedProfile, setSubmittedProfile] = useState(false)
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
    if (userInfo.isVerifiedToTeach) {
      navigate('/teacher-dashboard')
    }
  }, [userInfo.isVerifiedToTeach, navigate])

  useEffect(() => {
    async function fetchExistProfile() {
      const currentUserId = localStorage.getItem('currentUserId')
      if (currentUserId) {
        setIsAppLoading(true)
        try {
          const result = await teacherProfileService.getProfileById(
            currentUserId
          )
          if (
            result.data &&
            result.data.profileStatus === PROFILE_STATUS.CHECKING
          ) {
            setSubmittedProfile(true)
          } else {
            if (result.data.commentForAdmin) {
              setCommentFromAdmin(result.data.commentForAdmin)
            }
            setTeacherBasicInfo({
              teacherAvatar: result.data.teacherAvatar,
              publicTeacherName: result.data.publicTeacherName,
              email: result.data.email,
              phoneNumber: result.data.phoneNumber,
              location: result.data.location,
              onlineProfile: result.data.onlineProfile,
              teacherSelfDescription: result.data.teacherSelfDescription
            })

            setTeacherAdvancedInfo({
              experiences: result.data.experiences,
              classGeneralInformation: result.data.classGeneralInformation,
              classPlan: result.data.classPlan,
              sampleTeaching: result.data.sampleTeaching
            })
          }
          setIsAppLoading(false)
        } catch (err) {
          setIsAppLoading(false)
        }
      }
    }
    fetchExistProfile()
  }, [])

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

  const handleSubmitProfile = async () => {
    setIsBlocking(false)
    setIsSubmitting(true)
    try {
      const data = { ...teacherBasicInfo, ...teacherAdvancedInfo }
      const formData = new FormData()
      for (let field in data) {
        if (field === 'experiences') {
          formData.append(field, JSON.stringify(data[field]))
        } else {
          formData.append(field, data[field])
        }
      }
      const uploadResult = await teacherProfileService.uploadProfile(formData)
      if (uploadResult) {
        setSubmittedProfile(true)
      }
      setIsSubmitting(false)
    } catch (err) {
      setIsSubmitting(false)
      throw new Error(err)
    }
  }

  const handleToggleDialog = (status) => {
    setOpenDialog(status)
  }

  return (
    <Fragment>
      <SEO title={translation('teacherProfile.submitProfile')} />
      <Layout compactFooter>
        {isAppLoading ? (
          <Loading />
        ) : (
          <Fragment>
            {isSubmittedProfile ? (
              <Container maxWidth="md" className="profile-submitted">
                <Box sx={{ p: 2 }} className="profile-submitted__box">
                  <div
                    style={{
                      width: '400px',
                      height: '300px',
                      margin: '0 auto 20px auto'
                    }}
                  >
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src="/images/instructor/profile/banner-submit.png"
                      alt=""
                    />
                  </div>
                  <Box sx={{ textAlign: 'center', mb: 1 }}>
                    <Typography variant="h6" className="profile__section-title">
                      {translation('teacherProfile.submitSuccessfully')}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="subtitle"
                      className="profile__section-subtitle"
                    >
                      {translation('teacherProfile.thankYou')}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mt: 4,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Link className="rn-btn edu-btn mr--15" to="/">
                      <span>Go Home</span>
                    </Link>
                    <Link className="rn-btn edu-btn" to="/courses">
                      <span>View Coures</span>
                    </Link>
                  </Box>
                </Box>
              </Container>
            ) : (
              <Container maxWidth="lg" className="profile-form">
                <Typography variant="h4" className="profile-page-title">
                  {translation('teacherProfile.applyToTeach')}
                </Typography>
                <Box id="step-1" className="profile__section">
                  <Typography variant="h4" className="profile__section-title">
                    {translation('teacherProfile.step1')}&nbsp;
                    <span style={{ color: '#525fe1' }}>LetMeet</span>
                  </Typography>
                  <Typography
                    variant="subtitle"
                    className="profile__section-subtitle"
                  >
                    {translation('teacherProfile.step1Subtitle')}
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
                          onClick={() =>
                            setTogglerIntroVideo(!togglerIntroVideo)
                          }
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
                    {translation('teacherProfile.step2')}
                  </Typography>
                  <Typography
                    variant="subtitle"
                    className="profile__section-subtitle"
                  >
                    {translation('teacherProfile.step2Subtitle')}
                  </Typography>
                  <Box>
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
                                {translation('teacherProfile.step2Extra1-1')}{' '}
                                <strong>{userInfo?.firstName}</strong>
                                {translation('teacherProfile.step2Extra1-2')}
                                <br />
                                {translation('teacherProfile.step2Extra2')}
                              </Typography>
                              <Typography className="profile__block-subtitle">
                                {translation('teacherProfile.step2Extra3')}
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
                  </Box>
                </Box>
                <Box id="step-3" className="profile__section mt--40">
                  <Typography variant="h4" className="profile__section-title">
                    {translation('teacherProfile.step3')}
                  </Typography>
                  <Typography
                    variant="subtitle"
                    className="profile__section-subtitle"
                  >
                    {translation('teacherProfile.step3Subtitle')}
                  </Typography>
                  <ClassInformation
                    teacherAdvancedInfo={teacherAdvancedInfo}
                    handleChangeAdvancedInfo={handleChangeAdvancedInfo}
                  />
                </Box>
                <Box id="step-4" className="profile__section mt--40">
                  <Typography variant="h4" className="profile__section-title">
                    {translation('teacherProfile.step4')}
                  </Typography>
                  <SampleTeach
                    sampleTeachVideo={teacherAdvancedInfo?.sampleTeaching}
                    handleChangeAdvancedInfo={handleChangeAdvancedInfo}
                  />
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
                    disabled={!isValidToSubmit || isSubmitting}
                    onClick={handleSubmitProfile}
                  >
                    {isSubmitting && (
                      <CircularProgress
                        thickness={5}
                        sx={{
                          color: 'red',
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
                    {translation('teacherProfile.submitProfile')}
                  </button>
                </Box>
                <FsLightbox
                  toggler={togglerIntroVideo}
                  sources={videoLink}
                  maxYoutubeVideoDimensions={{ width: 900, height: 550 }}
                />
                {commentFromAdmin && (
                  <Fragment>
                    <Tooltip
                      title={translation(
                        'teacherProfile.fieldShouldBeImproved'
                      )}
                    >
                      <WarningIcon
                        sx={{
                          color: 'yellow',
                          fontSize: '40px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'fixed',
                          bottom: '80px',
                          right: '30px',
                          zIndex: 1000,
                          cursor: 'pointer'
                        }}
                        onClick={() => handleToggleDialog(true)}
                      />
                    </Tooltip>
                    <CustomDialog
                      fullWidth
                      customStyle
                      title={translation('teacherProfile.ourAdvice')}
                      open={openDialog}
                      setOpen={handleToggleDialog}
                    >
                      <Box>{commentFromAdmin}</Box>
                    </CustomDialog>
                  </Fragment>
                )}
              </Container>
            )}
          </Fragment>
        )}
      </Layout>
    </Fragment>
  )
}

export default CreateTeacherProfile
