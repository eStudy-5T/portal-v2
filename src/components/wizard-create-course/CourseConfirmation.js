import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@mui/material'

const CourseConfirmation = () => {
  return (
    <Fragment>
      <Box sx={{ mt: 10, mb: 10 }}>
        <Grid container component="main" spacing={1}>
          <Grid item xs={12}>
            <Box mt={5} mb={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" fontSize="18px">
                Congratulations! You just completed the first step towards
                creating a Course in LetMeet Nothing is visible to the public at
                this time.
              </Typography>
              <Typography variant="h6" fontSize="18px">
                Press the <strong>Done</strong> button below to complete this
                process. You may continue to add content to your Course or exit
                and come back later.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default CourseConfirmation
