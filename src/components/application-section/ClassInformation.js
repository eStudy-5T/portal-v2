import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, InputLabel, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const ClassInformation = ({
  teacherAdvancedInfo,
  handleChangeAdvancedInfo
}) => {
  const { t: translation } = useTranslation()
  const onChangeClassInfo = (event) => {
    const inputFieldName = event.target.name
    const value = event.target.value
    handleChangeAdvancedInfo(value, inputFieldName)
  }

  return (
    <Box className="profile-box">
      <Box className="profile-box__content">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <InputLabel
              sx={{ whiteSpace: 'unset' }}
              htmlFor="class-general-infomation"
              className="basic-info__input-lonnglabel"
              required
            >
              {translation('teacherProfile.info1')}
              <Tooltip title={translation('teacherProfile.info1Tooltip')}>
                <HelpOutlineIcon
                  sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                />
              </Tooltip>
            </InputLabel>
            <textarea
              id="class-general-infomation"
              name="classGeneralInformation"
              value={teacherAdvancedInfo?.classGeneralInformation || ''}
              onChange={onChangeClassInfo}
              rows="5"
              required
            ></textarea>
          </Grid>
          <Grid item xs={12} md={12} sx={{ mt: 1 }}>
            <InputLabel
              htmlFor="class-plan"
              className="basic-info__input-label"
              required
            >
              {translation('teacherProfile.info2')}
              <Tooltip title={translation('teacherProfile.info2Tooltip')}>
                <HelpOutlineIcon
                  sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                />
              </Tooltip>
            </InputLabel>
            <textarea
              id="class-plan"
              name="classPlan"
              value={teacherAdvancedInfo?.classPlan || ''}
              onChange={onChangeClassInfo}
              rows="5"
              required
            ></textarea>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ClassInformation
