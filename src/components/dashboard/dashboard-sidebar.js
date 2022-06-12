import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Drawer, IconButton, useMediaQuery } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NavItem from './nav-item'

import { useTranslation } from 'react-i18next'

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

const DashboardSidebar = (props) => {
  const { isOpen, close } = props
  const { t: translation } = useTranslation()
  const lgUp = useMediaQuery('(min-width:1200px)', {
    defaultMatches: true
  })

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div className="dashboard-drawer logo">
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <img
              className="logo-light"
              src="/images/logo/logo.png"
              alt="Main Logo"
            />
          </Link>
          <IconButton sx={{ ml: 3 }} onClick={close}>
            <ChevronLeftIcon sx={{ color: 'white', fontSize: '30px' }} />
          </IconButton>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              title={translation(item.title)}
              href={item.href}
            />
          ))}
        </Box>
      </Box>
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        className="dashboard-drawer"
        anchor="left"
        open={isOpen}
        variant="persistent"
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      className="dashboard-drawer"
      anchor="left"
      onClose={close}
      open={isOpen}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

DashboardSidebar.propTypes = {
  close: PropTypes.func,
  isOpen: PropTypes.bool
}

export default DashboardSidebar
