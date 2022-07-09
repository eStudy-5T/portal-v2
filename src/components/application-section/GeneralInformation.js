import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Button,
  Avatar,
  Box,
  Typography,
  Divider,
  Grid,
  InputLabel,
  Tooltip
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CloneAvatar from '../../assets/images/clone.png'
import Select from 'react-select'
import { VIETNAM_PROVINCE } from '../../utils/constants/province'
import { resizeImage } from '../../utils/helpers/image-helper'

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

const GeneralInformation = ({ basicInfo, handleChangeBasicInfo }) => {
  const { t: translation } = useTranslation()
  const [teacherAvatar, setTeacherAvatar] = useState(null)

  const onChangeAvatar = async (event) => {
    event.preventDefault()
    try {
      const file = event.target.files[0]
      const resizedImage = await resizeImage(file, 256, 256, file.type)
      setTeacherAvatar(resizedImage)
      handleChangeBasicInfo(resizedImage, 'teacherAvatar')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeFieldData = (event, field) => {
    if (field === 'location') {
      if (event?.value) {
        handleChangeBasicInfo(event.value, field)
      }
      return
    } else {
      const inputFieldName = event.target.name
      const value = event.target.value
      handleChangeBasicInfo(value, inputFieldName)
    }
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
    <Box className="profile-box">
      <Box className="profile-box__header">
        <Typography variant="h5" fontSize="22px" fontWeight={600}>
          {translation('teacherProfile.generalInformation')}
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: '#E0E0E0' }} />
      <Box className="profile-box__content">
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <Box className="profile-box__avatar">
                <Avatar
                  src={
                    (teacherAvatar && URL.createObjectURL(teacherAvatar)) ||
                    CloneAvatar
                  }
                  sx={{
                    height: 200,
                    width: 200,
                    mb: 2
                  }}
                />
                <Button component="label" className="profile-box__avatar-btn">
                  <input
                    name="teacherAvatar"
                    type="file"
                    accept="image/*"
                    onChange={onChangeAvatar}
                    hidden
                  />
                  {translation('teacherProfile.uploadAvatar')}
                </Button>
              </Box>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    required
                    htmlFor="public-teacher-name"
                    className="basic-info__input-label"
                  >
                    {translation('teacherProfile.publicTeacherName')}
                    <Tooltip
                      title={translation(
                        'teacherProfile.publicTeacherNameTooltip'
                      )}
                    >
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="public-teacher-name"
                    type="text"
                    name="publicTeacherName"
                    placeholder={translation('teacherProfile.typeHere')}
                    value={basicInfo.publicTeacherName || ''}
                    onChange={handleChangeFieldData}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    required
                    htmlFor="email"
                    className="basic-info__input-label"
                  >
                    Email
                    <Tooltip title={translation('teacherProfile.emailTooltip')}>
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="nguyenvana@gmail.com"
                    value={basicInfo.email || ''}
                    onChange={handleChangeFieldData}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    required
                    htmlFor="phone-number"
                    className="basic-info__input-label"
                  >
                    {translation('teacherProfile.phoneNumber')}
                    <Tooltip
                      title={translation('teacherProfile.phoneNumberTooltip')}
                    >
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="phone-number"
                    type="number"
                    name="phoneNumber"
                    placeholder="+84"
                    value={basicInfo.phoneNumber || ''}
                    onChange={handleChangeFieldData}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel
                    required
                    htmlFor="location"
                    className="basic-info__input-label"
                  >
                    {translation('teacherProfile.location')}
                    <Tooltip
                      title={translation('teacherProfile.locationTooltip')}
                    >
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <Select
                    id="location"
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder={translation('teacherProfile.selectHere')}
                    isClearable={true}
                    isSearchable={true}
                    name="location"
                    styles={customStyles}
                    options={VIETNAM_PROVINCE}
                    components={{ Option: CustomSelectOption }}
                    onChange={(event) =>
                      handleChangeFieldData(event, 'location')
                    }
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel
                    htmlFor="online-profiles"
                    className="basic-info__input-label"
                  >
                    {translation('teacherProfile.onlineProfile')}
                    <Tooltip
                      title={translation('teacherProfile.onlineProfileTooltip')}
                    >
                      <HelpOutlineIcon
                        sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </InputLabel>
                  <input
                    id="online-profiles"
                    type="text"
                    name="onlineProfile"
                    placeholder={translation('teacherProfile.typeHere')}
                    value={basicInfo.onlineProfile || ''}
                    onChange={handleChangeFieldData}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={12}>
              <InputLabel
                htmlFor="self-description"
                className="basic-info__input-label"
                required
              >
                {translation('teacherProfile.shortDescription')}
                <Tooltip title="This assist students in getting to know you better">
                  <HelpOutlineIcon
                    sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                  />
                </Tooltip>
              </InputLabel>
              <textarea
                id="self-description"
                name="teacherSelfDescription"
                rows="3"
                required
                value={basicInfo.teacherSelfDescription || ''}
                onChange={handleChangeFieldData}
              ></textarea>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default GeneralInformation
