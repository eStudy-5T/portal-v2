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
import { useTranslation } from 'react-i18next'

// Validators
import { getValidationHelperText } from '../../utils/helpers/validation-helper'
import { WEEK_DAYS } from '../../utils/constants/misc'

const CreateTimeForm = (props) => {
  const { t: translation } = useTranslation()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      start_time: '',
      end_time: '',
      day: 0
    }
  })

  const onSubmit = (data) => {}

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
              className="input_time"
              id="lesson-duration-start"
              type="time"
              name="start-time"
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
              className="input_time"
              id="lesson-duration-end"
              type="time"
              name="end-time"
            />
          </Grid>
        </Grid>
        <Grid container component="main" spacing={1}>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <FormControl required sx={{ width: '100%' }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="basic-info__input-label"
                >
                  Day of Week
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  sx={{ margin: '0 auto' }}
                >
                  {WEEK_DAYS.map((day) => (
                    <FormControlLabel
                      key={day.value}
                      value={day.value}
                      control={<Radio />}
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
          <Button variant="contained" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="success">
            Add
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default CreateTimeForm
