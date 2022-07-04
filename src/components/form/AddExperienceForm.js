import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Stack,
  Button,
  Grid,
  InputLabel,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const AddExperienceForm = ({
  successBtnText,
  editData,
  isEditing,
  setOpen,
  handleAddExperience,
  handleEditExperience
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {}
  })

  const onSubmit = (data) => {
    if (!isValid) {
      return
    }
  }

  return (
    <div className="login-form-box">
      <form className="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel
              required
              htmlFor="exp-title"
              className="basic-info__input-label"
            >
              Title
            </InputLabel>
            <input
              id="exp-title"
              type="text"
              name=" expTitle"
              placeholder="Ex: High School Teacher"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              required
              htmlFor="exp-organization"
              className="basic-info__input-label"
            >
              Organization
            </InputLabel>
            <input
              id="exp-organization"
              type="text"
              name="expOrganization"
              placeholder="Ex: Gia Dinh High School"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              required
              htmlFor="exp-location"
              className="basic-info__input-label"
            >
              Location
            </InputLabel>
            <input
              id="exp-location"
              type="text"
              name="expLocation"
              placeholder="Ex: Ho Chi Minh"
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup className="basic-info__checkbox">
              <FormControlLabel
                control={<Checkbox sx={{ color: 'var(--color-primary)' }} />}
                label="I am currently working on this position"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel
              required
              htmlFor="exp-start-time"
              className="basic-info__input-label"
            >
              Start Time
            </InputLabel>
            <input type="month" id="exp-start-time" name="expStartTime" />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel
              required
              htmlFor="exp-end-time"
              className="basic-info__input-label"
            >
              End Time
            </InputLabel>
            <input type="month" id="exp-end-time" name="expEndTime" />
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              required
              htmlFor="exp-description"
              className="basic-info__input-label"
            >
              Description
            </InputLabel>
            <textarea
              id="exp-description"
              name="expDescription"
              rows="3"
              required
            ></textarea>
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

export default AddExperienceForm
