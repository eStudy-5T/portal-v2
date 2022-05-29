import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@mui/material'

const CourseConfirmation = () => {
  return (
    <Fragment>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Grid container component="main" spacing={1}>
          <Typography variant="h6" align="center">
            Congratulations! You just completed the first step towards creating
            a Course in LetMeet
            <Typography variant="h6">
              Nothing is visible to the public at this time. Press the Done
              button below to complete this process. You may then continue to
              add content to your Course or exit and come back later. Your
              progress will be saved.
            </Typography>
          </Typography>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default CourseConfirmation
