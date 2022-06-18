import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

// Mui Components
import {
  Box,
  Grid,
  InputLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio
} from '@mui/material'

// i18n
// import { useTranslation } from 'react-i18next'

import { WEEK_DAYS } from '../../utils/constants/misc'

const styles = {
  radio: {
    color: '#3d47b4',
    '&.Mui-checked': {
      color: '#525fe1'
    }
  }
}

const ScheduleTimeForm = ({
  successBtnText,
  editData,
  isEditing,
  setOpen,
  handleAddScheduleTime,
  handleEditTime
}) => {
  // const { t: translation } = useTranslation()
  const [checked, setChecked] = useState(editData ? editData.dayOfWeek : '')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      startTime: editData ? editData.startTime : '',
      endTime: editData ? editData.endTime : '',
      dayOfWeek: editData ? editData.dayOfWeek : ''
    }
  })

  const onSubmit = (data) => {
    if (!isValid) {
      return
    }

    if (isEditing) {
      const editTimeData = { id: editData.id, ...data }
      handleEditTime(editTimeData)
    } else {
      handleAddScheduleTime(data)
    }
    setOpen(false)
  }

  const handleChangeTime = (event) => {
    setChecked(event.target.value)
  }

  return (
    <div className="login-form-box">
      <form className="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container component="main" spacing={1}>
          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <InputLabel
              required
              htmlFor="lesson-duration-start"
              className="basic-info__input-label"
            >
              Start Time
            </InputLabel>
            <input
              className={
                'input_time ' + (errors.startTime ? ' input-error' : '')
              }
              id="lesson-duration-start"
              type="time"
              {...register('startTime', {
                required: 'error.emptyField'
              })}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <InputLabel
              required
              htmlFor="lesson-duration-end"
              className="basic-info__input-label"
            >
              End Time
            </InputLabel>
            <input
              className={'input_time ' + (errors.endTime ? ' input-error' : '')}
              id="lesson-duration-end"
              type="time"
              {...register('endTime', {
                required: 'error.emptyField'
              })}
            />
          </Grid>
        </Grid>
        <Grid container component="main" spacing={1}>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <FormControl required sx={{ width: '100%' }}>
                <Box>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    className="basic-info__input-label"
                    sx={{ mr: '10px' }}
                  >
                    Day of Week
                  </FormLabel>
                </Box>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  sx={{ margin: '0 auto' }}
                  onChange={handleChangeTime}
                  value={checked}
                >
                  {WEEK_DAYS.map((day) => (
                    <FormControlLabel
                      {...register('dayOfWeek', {
                        required: 'error.emptyField'
                      })}
                      key={day.value}
                      value={day.value}
                      control={<Radio sx={styles.radio} />}
                      label={day.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 4, justifyContent: 'right' }}
        >
          <Button
            variant="text"
            color="error"
            onClick={() => setOpen(false)}
            sx={{ textTransform: 'capitalize' }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ textTransform: 'capitalize' }}
          >
            {successBtnText}
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default ScheduleTimeForm
