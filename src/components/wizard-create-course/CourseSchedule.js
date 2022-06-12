import React, { Fragment, useState, useEffect } from 'react'
import {
  Box,
  Grid,
  InputLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography
} from '@mui/material'
import * as moment from 'moment'
import * as fns from 'date-fns'
import { toast } from 'react-toastify'
// import {
//   calculatePermanentLessonNumber,
//   calculateFlexibleLessonNumber
// } from '../../utils/helpers/date-helper'
import CustomDialog from '../dialog/CustomDialog'
import CreateTimeForm from '../../components/form/CreateTimeForm'

import Select from 'react-select'

import { COURSE_SCHEDULE_TYPE, WEEK_DAYS } from '../../utils/constants/misc'

const FORMAT_DATE = 'YYYY-MM-DD'
const FORMAT_TIME = 'h:mma'

const CourseSchedule = ({
  courseScheduleData,
  handleChangeScheduleData,
  handleChangeMultiSelect
}) => {
  const [lessonDuration, setLessonDuration] = useState(0)
  const [totalWeek, setTotalWeek] = useState(0)
  const [daysOfWeek, setDaysOfWeek] = useState([])
  const [isAddTimeItem, setAddTimeItem] = useState(false)

  useEffect(() => {
    const days = courseScheduleData.daysOfWeek.map((day) => {
      return WEEK_DAYS.find((wd) => wd.value === day)
    })

    setDaysOfWeek(days)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (courseScheduleData.startTime && courseScheduleData.endTime) {
      const duration = calculateLessonDuration(
        courseScheduleData.startTime,
        courseScheduleData.endTime
      )
      setLessonDuration(duration)
    }

    if (courseScheduleData.startDate && courseScheduleData.endDate) {
      const weekDuration = calculateTotalWeek(
        courseScheduleData.startDate,
        courseScheduleData.endDate
      )
      setTotalWeek(weekDuration)
    }
  }, [
    courseScheduleData.startTime,
    courseScheduleData.endTime,
    courseScheduleData.startDate,
    courseScheduleData.endDate
  ])

  const handleDialogAddTimeItem = (status) => setAddTimeItem(status)

  const handleChangeWeekDays = (newValue, actionMeta) => {
    setDaysOfWeek(newValue)
    handleChangeMultiSelect(newValue, 'daysOfWeek', 'schedule')
  }

  const handleChangeFieldData = (event) => {
    const field = event.target.name
    const value = event.target.value
    handleChangeScheduleData(value, field)

    if (field === 'startDate') {
      if (
        !courseScheduleData.enrollmentDeadline ||
        courseScheduleData.enrollmentDeadline === 'Invalid date'
      ) {
        const defaultDeadline = moment(value, FORMAT_DATE)
          .add(7, 'days')
          .format(FORMAT_DATE)
        console.log('defaultDeadline', defaultDeadline)
        handleChangeScheduleData(defaultDeadline, 'enrollmentDeadline')
      }
    }

    if (field === 'scheduleType') {
      setLessonDuration(0)
      setTotalWeek(0)
      setDaysOfWeek([])
    }
  }

  const calculateLessonDuration = (startTime, endTime) => {
    const m_start = moment(startTime, FORMAT_TIME)
    const m_end = moment(endTime, FORMAT_TIME)
    const duration = moment.duration(m_end.diff(m_start)).asMinutes()
    return duration
  }

  const calculateTotalWeek = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return fns.differenceInWeeks(end, start)
  }

  return (
    <Fragment>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Box component="form">
          <Grid container component="main" spacing={1}>
            <Grid item xs={12} md={3} sx={{ mt: 2 }}>
              <InputLabel
                required
                htmlFor="start-date"
                className="basic-info__input-label"
              >
                Start Date
              </InputLabel>
              <input
                id="start-date"
                type="date"
                placeholder="Type here"
                name="startDate"
                value={courseScheduleData.startDate || ''}
                onChange={handleChangeFieldData}
                required
              />
            </Grid>
            <Grid item xs={12} md={3} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="end-date"
                className="basic-info__input-label"
                required
              >
                End Date
              </InputLabel>
              <input
                id="end-date"
                type="date"
                placeholder="Type here"
                name="endDate"
                value={courseScheduleData.endDate || ''}
                onChange={handleChangeFieldData}
                required
              />
            </Grid>
            <Grid item xs={12} md={3} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="enrollment-deadline"
                className="basic-info__input-label"
                required
              >
                Enrollment Deadline
              </InputLabel>
              <input
                id="enrollment-deadline"
                type="date"
                placeholder="Type here"
                name="enrollmentDeadline"
                value={courseScheduleData.enrollmentDeadline || ''}
                onChange={handleChangeFieldData}
                required
              />
            </Grid>
            <Grid item xs={12} md={3} sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="total-week"
                className="basic-info__input-label"
              >
                Total Week
              </InputLabel>
              <input
                id="total-week"
                type="text"
                value={totalWeek}
                readOnly
                disabled
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <FormControl required>
              <FormLabel
                id="demo-radio-buttons-group-label"
                className="basic-info__input-label"
              >
                Detail Time
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="scheduleType"
                value={
                  courseScheduleData.scheduleType ||
                  COURSE_SCHEDULE_TYPE.PERMANENT
                }
                onChange={handleChangeFieldData}
              >
                <FormControlLabel
                  value={COURSE_SCHEDULE_TYPE.PERMANENT}
                  control={<Radio />}
                  label="Permanent Time"
                />
                <FormControlLabel
                  value={COURSE_SCHEDULE_TYPE.FLEXIBLE}
                  control={<Radio />}
                  label="Flexible Time"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            {courseScheduleData.scheduleType ===
              COURSE_SCHEDULE_TYPE.PERMANENT && (
              <Fragment>
                <Grid container component="main" spacing={1}>
                  <Grid item xs={12} md={2} sx={{ mt: 1 }}>
                    <InputLabel
                      required
                      htmlFor="start-time"
                      className="basic-info__input-label"
                    >
                      Start Time
                    </InputLabel>
                    <input
                      id="start-time"
                      type="time"
                      name="startTime"
                      required
                      value={courseScheduleData.startTime || ''}
                      onChange={handleChangeFieldData}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} sx={{ mt: 1 }}>
                    <InputLabel
                      required
                      htmlFor="end-time"
                      className="basic-info__input-label"
                    >
                      End Time
                    </InputLabel>
                    <input
                      id="end-time"
                      type="time"
                      name="endTime"
                      required
                      value={courseScheduleData.endTime || ''}
                      onChange={handleChangeFieldData}
                    />
                  </Grid>
                  <Grid item xs={12} md={8} sx={{ mt: 1 }}>
                    <InputLabel required className="basic-info__input-label">
                      Day(s) of Week
                    </InputLabel>
                    <Select
                      id="course-grade"
                      isMulti
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select here"
                      name="grade"
                      options={WEEK_DAYS}
                      value={daysOfWeek}
                      onChange={handleChangeWeekDays}
                    />
                  </Grid>
                </Grid>
                <Grid container component="main" spacing={1}>
                  <Grid item xs={12} md={4} sx={{ mt: 2 }}>
                    <InputLabel
                      htmlFor="total-lesson"
                      className="basic-info__input-label"
                    >
                      Total Lesson in Course
                    </InputLabel>
                    <input id="total-lesson" type="number" readOnly disabled />
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ mt: 2 }}>
                    <InputLabel
                      htmlFor="lesson-duration"
                      className="basic-info__input-label"
                    >
                      Lesson Duration (Minutes)
                    </InputLabel>
                    <input
                      id="lesson-duration"
                      type="number"
                      value={lessonDuration}
                      readOnly
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ mt: 2 }}>
                    <InputLabel
                      htmlFor="total-duration"
                      className="basic-info__input-label"
                    >
                      Total Duration (Hours)
                    </InputLabel>
                    <input
                      id="total-duration"
                      type="number"
                      readOnly
                      disabled
                    />
                  </Grid>
                </Grid>
              </Fragment>
            )}
            {courseScheduleData.scheduleType ===
              COURSE_SCHEDULE_TYPE.FLEXIBLE && (
              <Fragment>
                <Box>
                  <Grid container component="main" spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                      <InputLabel
                        required
                        htmlFor="lesson-per-week"
                        className="basic-info__input-label"
                      >
                        Lesson per Week
                      </InputLabel>
                      <input
                        id="lesson-per-week"
                        type="number"
                        placeholder="Type here"
                        name="lessonNumberPerWeek"
                        required
                        value={courseScheduleData.lessonNumberPerWeek || ''}
                        onChange={handleChangeFieldData}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                      <InputLabel
                        htmlFor="total-lesson"
                        className="basic-info__input-label"
                      >
                        Total Lesson in Course
                      </InputLabel>
                      <input
                        id="total-lesson"
                        type="number"
                        readOnly
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <button
                    className="rn-btn edu-btn add-btn"
                    type="button"
                    onClick={() => handleDialogAddTimeItem(true)}
                  >
                    Add Time
                  </button>
                  <Typography variant="main" fontWeight="bold">
                    {courseScheduleData.lessonNumberPerWeek || 0} lesson left
                  </Typography>
                  <Grid container component="main" spacing={1} sx={{ mt: 1 }}>
                    <Typography variant="main" ml={2}>
                      No Time Established
                    </Typography>
                  </Grid>
                </Box>
                {/* Popup goes here */}
                <CustomDialog
                  fullWidth
                  maxWidth="md"
                  title="Create Block Time"
                  open={isAddTimeItem}
                  setOpen={handleDialogAddTimeItem}
                >
                  <CreateTimeForm />
                </CustomDialog>
              </Fragment>
            )}
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default CourseSchedule
