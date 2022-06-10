import React, { Fragment, useState } from 'react'
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
import CustomDialog from '../dialog/CustomDialog'
import CreateTimeForm from '../../components/form/CreateTimeForm'

import Select from 'react-select'

import { COURSE_SCHEDULE_TYPE, WEEK_DAYS } from '../../utils/constants/misc'

const CourseSchedule = () => {
  const [scheduleType, setScheduleType] = useState(
    COURSE_SCHEDULE_TYPE.PERMANENT
  )

  const [isAddTimeItem, setAddTimeItem] = useState(false)

  const handleDialogAddTimeItem = (status) => setAddTimeItem(status)

  const handleChangeScheduleType = (event, value) => {
    setScheduleType(value)
    console.group('Value Changed')
    console.log(value)
    console.log(`event: ${event}`)
    console.groupEnd()
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
              <input id="total-week" type="text" readOnly disabled />
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
                name="radio-buttons-group"
                defaultValue="permanent"
                onChange={handleChangeScheduleType}
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
            {scheduleType === COURSE_SCHEDULE_TYPE.PERMANENT && (
              <Fragment>
                <Grid container component="main" spacing={1}>
                  <Grid item xs={12} md={4} sx={{ mt: 1 }}>
                    <InputLabel
                      required
                      htmlFor="lesson-duration"
                      className="basic-info__input-label"
                    >
                      Start Time
                    </InputLabel>
                    <input
                      id="lesson-duration"
                      type="time"
                      name="permanent-start-time"
                    />
                  </Grid>
                  <Grid item xs={12} md={8} sx={{ mt: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <InputLabel required className="basic-info__input-label">
                        Day(s) of Week
                      </InputLabel>
                      <Typography variant="caption">0 days left</Typography>
                    </Box>
                    <Select
                      id="course-grade"
                      isMulti
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select here"
                      name="grade"
                      options={WEEK_DAYS}
                    />
                  </Grid>
                </Grid>
                <Grid container component="main" spacing={1}>
                  <Grid item xs={12} md={4} sx={{ mt: 2 }}>
                    <InputLabel
                      required
                      htmlFor="lesson-duration"
                      className="basic-info__input-label"
                    >
                      Lesson Duration (Minutes)
                    </InputLabel>
                    <input
                      id="lesson-duration"
                      type="number"
                      placeholder="Type here"
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
                  <Grid item xs={12} md={4} sx={{ mt: 2 }}>
                    <InputLabel
                      htmlFor="total-lesson"
                      className="basic-info__input-label"
                    >
                      Total Lesson in Course
                    </InputLabel>
                    <input id="total-lesson" type="number" readOnly disabled />
                  </Grid>
                </Grid>
              </Fragment>
            )}
            {scheduleType === COURSE_SCHEDULE_TYPE.FLEXIBLE && (
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
                        required
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
                    5 lesson left
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
