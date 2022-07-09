import React, { useState, Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Stack,
  Button,
  Grid,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Divider
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
  const { t: translation } = useTranslation()
  const [currentWork, setCurrentWork] = useState(
    editData ? !editData?.endTime : false
  )
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
              {translation('teacherProfile.title')}
            </InputLabel>
            <input
              className={errors.title ? 'input-error' : ''}
              id="exp-title"
              type="text"
              name="title"
              placeholder={translation('teacherProfile.titlePlaceholder')}
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
              {translation('teacherProfile.organization')}
            </InputLabel>
            <input
              className={errors.organization ? 'input-error' : ''}
              id="exp-organization"
              type="text"
              name="organization"
              placeholder={translation(
                'teacherProfile.organizationPlaceholder'
              )}
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
              {translation('teacherProfile.location')}
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
                  placeholder={translation('teacherProfile.selectHere')}
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
                    checked={currentWork}
                    sx={{ color: 'var(--color-primary)' }}
                  />
                }
                label={translation('teacherProfile.currentlyWorking')}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel
              required
              htmlFor="exp-start-time"
              className="basic-info__input-label"
            >
              {translation('teacherProfile.startTime')}
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
                {translation('teacherProfile.present')}
              </Box>
            ) : (
              <Fragment>
                <InputLabel
                  required
                  htmlFor="exp-end-time"
                  className="basic-info__input-label"
                >
                  {translation('teacherProfile.endTime')}
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
              {translation('teacherProfile.description')}
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
            {translation('teacherProfile.cancel')}
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
