import React from 'react'
// import Slider from 'react-slick'
import SEO from '../../common/SEO'
// import userService from '../../services/user-service'
import { useTranslation } from 'react-i18next'
// import Student from '../../components/student/Student'

import { Box, Container } from '@mui/material'
import { UsersList } from './customer/users-list'
import DashboardLayout from '../../components/dashboard/dashboard-layout'
import { customers } from './customer/customers'
import { adminTabs } from '../../utils/constants/dashboard-tab'

const ManageUserPage = () => {
  const { t: translation } = useTranslation()

  return (
    <>
      <SEO title={translation('nav.courses')} />
      <DashboardLayout items={adminTabs}>
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
