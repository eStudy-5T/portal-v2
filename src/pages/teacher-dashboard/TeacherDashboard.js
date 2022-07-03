import React from 'react'
import SEO from '../../common/SEO'
import DashboardLayout from '../../components/dashboard/dashboard-layout'
import { Box } from '@mui/material'
import { teacherTabs } from '../../utils/constants/dashboard-tab'

function TeacherDashboard() {
  return (
    <DashboardLayout items={teacherTabs}>
      <SEO title="Teacher Dashboard" />
      <Box m={5}>COMING SOON</Box>
    </DashboardLayout>
  )
}

export default TeacherDashboard
