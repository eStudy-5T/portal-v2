import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePrompt from '../../hooks/user-prompt'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import CourseBasicInfo from '../../components/wizard-create-course/CourseBasicInfo'
import CourseConfirmation from '../../components/wizard-create-course/CourseConfirmation'
import CourseSchedule from '../../components/wizard-create-course/CourseSchedule'
import { Box, Stepper, Step, StepLabel, Container } from '@mui/material'
import { COURSE_TYPE, COURSE_SCHEDULE_TYPE } from '../../utils/constants/misc'
import {
  validateBasicForm,
  validateScheduleForm
} from '../../utils/validators/create-course-validate'
import courseService from '../../services/course-service'

const steps = ['Course Overview', 'Course Schedule', 'Confirmation']

const initializeCourseBasic = {
  type: COURSE_TYPE.RUNNING,
  title: '',
  slug: '',
  maxStudentNumber: 0,
  description: '',
  categoryId: '',
  subjectId: '',
  grade: '',
  tags: []
}

const initializeCourseSchedule = {
  startDate: null,
  endDate: null,
  enrollmentDeadline: null,
  scheduleType: COURSE_SCHEDULE_TYPE.PERMANENT,
  //Permanent time
  startTime: null,
  endTime: null,
  daysOfWeek: [],
  //Flexible time
  lessonNumberPerWeek: 0,
  schedules: []
}

const NewCourse = () => {
  const navigate = useNavigate()
  const [isAllowNextStep, setAllowNextStep] = useState(false)
  const [courseBasicData, setCourseBasicData] = useState(initializeCourseBasic)
  const [courseScheduleData, setCourseScheduleData] = useState(
    initializeCourseSchedule
  )
  const [isBlocking, setIsBlocking] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  usePrompt('Reload site? Changes you made may not be saved.', isBlocking)

  useEffect(() => {
    let isAllowNextStep
    if (activeStep === 0) {
      isAllowNextStep = validateBasicForm(courseBasicData)
    } else if (activeStep === 1) {
      isAllowNextStep = validateScheduleForm(courseScheduleData)
    } else if (activeStep === 2) {
      isAllowNextStep = true
    }

    setAllowNextStep(isAllowNextStep)
  }, [courseScheduleData, courseBasicData, activeStep])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleNext = () => {
    scrollTop()
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    scrollTop()
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleChangeBasicData = (value, field) => {
    setIsBlocking(true)
    setCourseBasicData((prevCourseBasicData) => ({
      ...prevCourseBasicData,
      [field]: value || ''
    }))
  }

  const handleChangeScheduleData = (value, field) => {
    setIsBlocking(true)

    if (field === 'scheduleType') {
      setCourseScheduleData((prevCourseScheduleData) => ({
        ...prevCourseScheduleData,
        startTime: null,
        endTime: null,
        daysOfWeek: [],
        lessonNumberPerWeek: 0,
        schedules: null
      }))
    }

    setCourseScheduleData((prevCourseScheduleData) => ({
      ...prevCourseScheduleData,
      [field]: value || ''
    }))
  }

  const handleChangeMultiSelect = (newValue, field, form) => {
    setIsBlocking(true)
    let values = []

    if (!!newValue.length) {
      newValue.forEach((e) => {
        values.push(e.value)
      })
    }

    if (form === 'basic') {
      setCourseBasicData({
        ...courseBasicData,
        [field]: values
      })
    } else if (form === 'schedule') {
      setCourseScheduleData({
        ...courseScheduleData,
        [field]: values
      })
    }
  }

  const handleAddScheduleTime = (data) => {
    setIsBlocking(true)
    const scheduleTime = {
      id:
        (courseScheduleData.schedules
          ? courseScheduleData.schedules.length
          : 0) + 1,
      startTime: data.startTime,
      endTime: data.endTime,
      dayOfWeek: data.dayOfWeek
    }

    let schedules = courseScheduleData.schedules
      ? [...courseScheduleData.schedules]
      : []
    schedules.push(scheduleTime)
    setCourseScheduleData({
      ...courseScheduleData,
      schedules: schedules
    })
  }

  const handleSubmit = () => {
    console.log('courseBasicData', courseBasicData)
    console.log('courseScheduleData', courseScheduleData)
    const courseData = { ...courseBasicData, ...courseScheduleData }

    courseService
      .createCourse(courseData)
      .then((res) => {
        if (res) {
          navigate('/teacher-courses')
        }
      })
      .catch(console.log)
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CourseBasicInfo
            courseBasicData={courseBasicData}
            handleChangeBasicData={handleChangeBasicData}
            handleChangeMultiSelect={handleChangeMultiSelect}
          />
        )
      case 1:
        return (
          <CourseSchedule
            courseScheduleData={courseScheduleData}
            handleChangeScheduleData={handleChangeScheduleData}
            handleChangeMultiSelect={handleChangeMultiSelect}
            handleAddScheduleTime={handleAddScheduleTime}
          />
        )
      case 2:
        return <CourseConfirmation />
      default:
        return 'Wizard error'
    }
  }

  return (
    <Fragment>
      <SEO title="Create Course" />
      <Layout disableSticky compactFooter>
        <Box sx={{ mt: 6, mb: 6 }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Container maxWidth="lg" className="wizard-form ">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                  const stepProps = {}
                  const labelProps = {}
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              {/* Wizard step */}
              {getStepContent(activeStep)}
              {/* Wizard Tool */}
              <Fragment>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                >
                  {!!activeStep && (
                    <button
                      color="inherit"
                      className="rn-btn edu-btn"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === steps.length - 1 ? (
                    <button
                      className="rn-btn edu-btn"
                      onClick={handleSubmit}
                      disabled={!isAllowNextStep}
                    >
                      Finish
                    </button>
                  ) : (
                    <button
                      className="rn-btn edu-btn"
                      onClick={handleNext}
                      disabled={!isAllowNextStep}
                    >
                      Next
                    </button>
                  )}
                </Box>
              </Fragment>
            </Container>
          </Box>
        </Box>
      </Layout>
    </Fragment>
  )
}

export default NewCourse
