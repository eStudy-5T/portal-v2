import { useState, useEffect } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import DashboardSidebar from './dashboard-sidebar'
import Header from '../../common/header/Header'

const DashboardLayoutRoot = styled('div')(({ theme, issidebaropen }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: issidebaropen === 'true' ? 280 : 0
  }
}))

const DashboardLayout = (props) => {
  const { children } = props
  const lgUp = useMediaQuery('(min-width:1200px)', {
    defaultMatches: true
  })
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    setSidebarOpen(lgUp)
  }, [lgUp])

  return (
    <>
      <DashboardLayoutRoot issidebaropen={isSidebarOpen.toString()}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Header
            styles="header-style-2"
            isDashboard
            isSidebarOpen={isSidebarOpen}
            openDashboard={() => setSidebarOpen(true)}
            disableSticky
          />

          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardSidebar
        close={() => setSidebarOpen(false)}
        isOpen={isSidebarOpen}
      />
    </>
  )
}

export default DashboardLayout
