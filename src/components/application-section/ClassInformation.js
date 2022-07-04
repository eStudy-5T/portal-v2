import React from 'react'
import { Container, Box, Grid, InputLabel, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const ClassInformation = () => {
  return (
    <Container maxWidth="lg">
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
                What topics are you passionate about teaching? Which grades of
                learners do you want to work with? What experience or expertise
                do you have in these subject areas
                <Tooltip title="It's fine to discuss broad topics here (no need to have the perfect class title)">
                  <HelpOutlineIcon
                    sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                  />
                </Tooltip>
              </InputLabel>
              <textarea
                id="class-general-infomation"
                name="classGeneralInformation"
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
                How will your class be structured? Fill in the blanks with an
                example of a class description.
                <Tooltip title="Include information about what you plan to teach, how you plan to teach it, and what students can expect from class time. This field is only for our team and will not be made public.">
                  <HelpOutlineIcon
                    sx={{ ml: 0.5, fontSize: '20px', cursor: 'pointer' }}
                  />
                </Tooltip>
              </InputLabel>
              <textarea
                id="class-plan"
                name="classPlan"
                rows="5"
                required
              ></textarea>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default ClassInformation
