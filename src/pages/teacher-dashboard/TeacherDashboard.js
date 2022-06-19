import React from 'react'
import SEO from '../../common/SEO'
import DashboardLayout from '../../components/dashboard/dashboard-layout'
import { Box } from '@mui/material'

const items = [
  {
    href: '/teacher-dashboard',
    icon: <i className="ri-file-chart-fill"></i>,
    title: 'dashboard.dashboard'
  },
  {
    href: '/teacher-courses',
    icon: <i className="ri-list-unordered"></i>,
    title: 'dashboard.courses'
  }
]

function TeacherDashboard() {
  return (
    <DashboardLayout items={items}>
      <SEO title="Teacher Dashboard" />
      <Box m={5}>COMING SOON</Box>
    </DashboardLayout>
  )
}

export default TeacherDashboard
