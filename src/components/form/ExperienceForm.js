import React, { useState, Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Stack,
  Button,
  Grid,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box
} from '@mui/material'
import { VIETNAM_PROVINCE } from '../../utils/constants/province'
import Select from 'react-select'

const customStyles = {
  control: (base) => ({
    ...base,
    height: 45,
    minHeight: 45,
    boxShadow: 'none'
  }),
  valueContainer: (base, state) => ({
    ...base,
    height: 45,
    display: 'flex',
    padding: 0
  }),
  input: (base, state) => ({
    ...base,
    margin: '0px'
  }),
  indicatorSeparator: (base) => ({
    display: 'none'
  }),
  indicatorsContainer: (base, state) => ({
    ...base,
    height: 45
  })
}

const ExperienceForm = ({
  successBtnText,
  editData,
  isEditing,
  setOpen,
  handleAddExperience,
  handleEditExperience
}) => {
  const [currentWork, setCurrentWork] = useState(!editData?.endTime)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: editData ? editData.title : '',
      organization: editData ? editData.organization : '',
      location: editData ? editData.location : '',
      startTime: editData ? editData.startTime : '',
      endTime: editData ? editData.endTime : '',
      description: editData ? editData.description : ''
    }
  })

  const onSubmit = (data) => {
    if (!isValid) {
      return
    }
    if (isEditing) {
      const editExp = { id: editData.id, ...data }
      handleEditExperience(editExp)
    } else {
      handleAddExperience(data)
    }
    setOpen(false)
  }

  const handleChooseCurrentWork = (event) => {
    setCurrentWork(event.target.checked)
  }

  const CustomSelectOption = ({
    children,
    innerProps,
    isDisabled,
    isFocused,
    isSelected
  }) => {
    return !isDisabled ? (
      <div
        {...innerProps}
        className={`profile__select-option ${isSelected ? 'active' : ''}`}
      >
        {children}
      </div>
    ) : null
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
              className={errors.title ? 'input-error' : ''}
              id="exp-title"
              type="text"
              name="title"
              placeholder="Ex: High School Teacher"
              {...register('title', {
                required: 'error.emptyField'
              })}
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
              className={errors.organization ? 'input-error' : ''}
              id="exp-organization"
              type="text"
              name="organization"
              placeholder="Ex: Gia Dinh High School"
              {...register('organization', {
                required: 'error.emptyField'
              })}
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
            <Controller
              control={control}
              name="location"
              render={({ field, value, name, ref }) => (
                <Select
                  inputRef={ref}
                  id="exp-location"
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select here"
                  isClearable={true}
                  isSearchable={true}
                  name="location"
                  styles={customStyles}
                  options={VIETNAM_PROVINCE}
                  components={{ Option: CustomSelectOption }}
                  value={VIETNAM_PROVINCE.find((c) => c.value === value)}
                  defaultValue={VIETNAM_PROVINCE.find(
                    (c) => c.value === editData?.location
                  )}
                  onChange={(val) => field.onChange(val.value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup
              className="basic-info__checkbox"
              onChange={handleChooseCurrentWork}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={currentWork}
                    sx={{ color: 'var(--color-primary)' }}
                  />
                }
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
            <input
              className={errors.startTime ? 'input-error' : ''}
              type="month"
              id="exp-start-time"
              name="startTime"
              {...register('startTime', {
                required: 'error.emptyField'
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {currentWork ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                Present
              </Box>
            ) : (
              <Fragment>
                <InputLabel
                  required
                  htmlFor="exp-end-time"
                  className="basic-info__input-label"
                >
                  End Time
                </InputLabel>
                <input
                  className={errors.endTime ? 'input-error' : ''}
                  type="month"
                  id="exp-end-time"
                  name="endTime"
                  {...register('endTime', {
                    required: 'error.emptyField'
                  })}
                />
              </Fragment>
            )}
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
              className={errors.description ? 'input-error' : ''}
              id="exp-description"
              name="description"
              rows="3"
              required
              {...register('description', {
                required: 'error.emptyField'
              })}
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

export default ExperienceForm
