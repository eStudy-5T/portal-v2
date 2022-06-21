import React, { useEffect, useState } from 'react'
// import Slider from 'react-slick'
import SEO from '../../common/SEO'
// import userService from '../../services/user-service'
import { useTranslation } from 'react-i18next'
// import StudentOne from '../../components/student/StudentOne'

import { Box, Container } from '@mui/material'
import { UsersList } from './customer/users-list'
import DashboardLayout from '../../components/dashboard/dashboard-layout'
import { customers } from './customer/customers'
import { IconCertificate, IconDashboard, IconSchool } from '@tabler/icons'

const ManageUserPage = () => {
  const { t: translation } = useTranslation()

  const items = [
    {
      href: '/dashboard',
      icon: <IconDashboard></IconDashboard>,
      title: 'dashboard.dashboard'
    },
    {
      href: '/manage-users',
      icon: <IconSchool></IconSchool>,
      title: 'admin.manageUsers'
    },
    {
      href: '/manage-courses',
      icon: <IconCertificate></IconCertificate>,
      title: 'admin.manageCourses'
    }
  ]

  return (
    <>
      <SEO title={translation('nav.courses')} />
      <DashboardLayout items={items} >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
              <UsersList customers={customers} />
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default ManageUserPage
