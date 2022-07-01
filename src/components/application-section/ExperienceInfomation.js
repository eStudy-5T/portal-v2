import React from 'react'
import { Box, Typography, Divider, Grid } from '@mui/material'

const ExperienceInfomation = () => {
  return (
    <Box className="profile-box">
      <Box className="profile-box__header">
        <Typography variant="h5" fontSize="22px" fontWeight={600}>
          Education and Teach Experience
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: '#E0E0E0' }} />
      <Box className="profile-box__content">
        <Grid container spacing={2}>
          <Grid item lg={4} md={6} xs={12}></Grid>
          <Grid item lg={8} md={6} xs={12}></Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ExperienceInfomation
