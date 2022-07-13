import React, { useEffect, useState, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import usePrompt from '../../hooks/user-prompt'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import CourseBasicInfo from '../../components/wizard-create-course/CourseBasicInfo'
import CourseSchedule from '../../components/wizard-create-course/CourseSchedule'
import AdvancedInformation from '../../components/wizard-create-course/AdvancedInformation'
import AdvancedSchedule from '../../components/wizard-create-course/AdvancedSchedule'
import { COURSE_TYPE, COURSE_SCHEDULE_TYPE } from '../../utils/constants/misc'
import {
  Typography,
  Box,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import courseService from '../../services/course-service'
import { toast } from 'react-toastify'

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

const initializeAdvancedInformation = {
  courseThumbnailVideo: '',
  courseThumbnailImage: '',
  whatStudentsGets: ''
}

const initializeAdvancedSchedule = {
  link: ''
}

const EditCourse = () => {
  const { t: translation } = useTranslation()
  const { courseId } = useParams()
  const [isLoading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [courseBasicData, setCourseBasicData] = useState(initializeCourseBasic)
  const [courseScheduleData, setCourseScheduleData] = useState(
    initializeCourseSchedule
  )
  const [courseAdvancedData, setCourseAdvancedData] = useState(
    initializeAdvancedInformation
  )
  const [courseAdvancedSchedule, setCourseAdvancedSchedule] = useState(
    initializeAdvancedSchedule
  )
  const [isBlocking, setIsBlocking] = useState(false)

  usePrompt('Reload site? Changes you made may not be saved.', isBlocking)

  useEffect(() => {
    // console.log('courseBasicData', courseBasicData)
    // console.log('courseScheduleData', courseScheduleData)
    // console.log('courseAdvancedData', courseAdvancedData)
    // console.log('courseAdvancedSchedule', courseAdvancedSchedule)
  }, [
    courseBasicData,
    courseScheduleData,
    courseAdvancedData,
    courseAdvancedSchedule
  ])

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      setIsFetching(true)
      const { data } = await courseService.getSpecificCourse(courseId)
      if (isMounted) {
        setCourseBasicData({
          type: data.type,
          title: data.title,
          slug: data.slug,
          maxStudentNumber: data.maxStudentNumber,
          description: data.description,
          categoryId: data.categoryId,
          subjectId: data.subjectId,
          grade: data.grade,
          tags: data.tags
        })

        setCourseScheduleData({
          startDate: data.startDate,
          endDate: data.endDate,
          enrollmentDeadline: data.enrollmentDeadline,
          scheduleType: data.scheduleType,
          startTime: data.startTime,
          endTime: data.endTime,
          daysOfWeek: data.daysOfWeek,
          lessonNumberPerWeek: data.lessonNumberPerWeek,
          schedules: data.schedules
        })

        setCourseAdvancedData({
          courseThumbnailVideo: data.courseThumbnailVideo,
          courseThumbnailImage: data.courseThumbnailImage,
          whatStudentsGets: data.whatStudentsGets
        })

        setCourseAdvancedSchedule({
          link: data.link
        })

        setIsFetching(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [courseId])

  const handleChangeBasicData = (value, field) => {
    setIsBlocking(true)
    setCourseBasicData((prevCourseBasicData) => ({
      ...prevCourseBasicData,
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

  const handleChangeScheduleData = (value, field) => {
    setIsBlocking(true)

    if (field === 'scheduleType') {
      setCourseScheduleData((prevCourseScheduleData) => ({
        ...prevCourseScheduleData,
        startTime: null,
        endTime: null,
        daysOfWeek: [],
        lessonNumberPerWeek: 0,
        schedules: []
      }))
    }

    setCourseScheduleData((prevCourseScheduleData) => ({
      ...prevCourseScheduleData,
      [field]: value || ''
    }))
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
    setCourseScheduleData((prevCourseScheduleData) => ({
      ...prevCourseScheduleData,
      schedules: schedules
    }))
  }

  const handleEditScheduleTime = (data) => {
    setIsBlocking(true)
    if (courseScheduleData.schedules && !!courseScheduleData.schedules.length) {
      const updatedData = courseScheduleData.schedules.map((schedule) => {
        return Number(schedule.id) === Number(data.id) ? data : schedule
      })

      setCourseScheduleData((prevCourseScheduleData) => ({
        ...prevCourseScheduleData,
        schedules: updatedData
      }))
    }
  }

  const handleChangeAdvancedData = (value, field) => {
    setIsBlocking(true)
    setCourseAdvancedData((prevTeacherBasicInfo) => ({
      ...prevTeacherBasicInfo,
      [field]: value || ''
    }))
  }

  const handleEditCourse = () => {
    setIsBlocking(false)
    setLoading(true)
    const courseData = {
      ...courseBasicData,
      ...courseScheduleData,
      ...courseAdvancedData,
      ...courseAdvancedSchedule
    }

    console.log(courseData)
    const formData = new FormData()
    for (let field in courseData) {
      if (courseData[field]) {
        if (/daysOfWeek|tags|schedules/.test(field)) {
          formData.append(field, JSON.stringify(courseData[field]))
        } else {
          formData.append(field, courseData[field])
        }
      }
    }

    courseService
      .updateCourse(courseId, formData)
      .then((res) => {
        if (res) {
          setLoading(false)
          toast.success(translation('manageCourse.updateSuccessfully'))
        }
      })
      .catch((err) => {
        setLoading(false)
        throw new Error(err)
      })
  }

  return (
    <Fragment>
      <SEO title={courseBasicData?.title} />
      <Layout disableSticky compactFooter>
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          {/* Basic Info */}
          <Accordion defaultExpanded sx={{ mb: 3 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {translation('manageCourse.basicInformation')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{ width: '100%', height: '100%' }}
                className="wizard-form-2"
              >
                <CourseBasicInfo
                  courseBasicData={courseBasicData}
                  handleChangeBasicData={handleChangeBasicData}
                  handleChangeMultiSelect={handleChangeMultiSelect}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Advanced Info */}
          <Accordion defaultExpanded sx={{ mb: 3 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {translation('manageCourse.advancedInformation')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{ width: '100%', height: '100%' }}
                className="wizard-form-2"
              >
                <AdvancedInformation
                  isFetching={isFetching}
                  courseAdvancedData={courseAdvancedData}
                  handleChangeAdvancedData={handleChangeAdvancedData}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Schedule Info */}
          <Accordion defaultExpanded sx={{ mb: 3 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {translation('manageCourse.schedule')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{ width: '100%', height: '100%' }}
                className="wizard-form-2"
              >
                <CourseSchedule
                  courseScheduleData={courseScheduleData}
                  handleChangeScheduleData={handleChangeScheduleData}
                  handleChangeMultiSelect={handleChangeMultiSelect}
                  handleAddScheduleTime={handleAddScheduleTime}
                  handleEditScheduleTime={handleEditScheduleTime}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Advanced Schedule Info */}
          <Accordion defaultExpanded sx={{ mb: 3 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {translation('manageCourse.advancedSchedule')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{ width: '100%', height: '100%' }}
                className="wizard-form-2"
              >
                <AdvancedSchedule
                  courseAdvancedSchedule={courseAdvancedSchedule}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
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
              onClick={handleEditCourse}
              disabled={isLoading}
            >
              {isLoading && (
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
              {translation('manageCourse.editCourse')}
            </button>
          </Box>
        </Container>
      </Layout>
    </Fragment>
  )
}

export default EditCourse
