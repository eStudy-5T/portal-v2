import { Box, Drawer, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import NavItem from './nav-item'

import { useTranslation } from 'react-i18next'

const openedMixin = (theme) => ({
  width: 280,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const CustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: 280,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

const DashboardSidebar = (props) => {
  const { lgUp, isOpen, open, close, items = [] } = props
  const { t: translation } = useTranslation()

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          sx={{ display: 'flex', justifyContent: isOpen ? 'end' : 'center' }}
        >
          {isOpen ? (
            <IconButton onClick={close}>
              <ChevronLeftIcon sx={{ color: 'white', fontSize: '30px' }} />
            </IconButton>
          ) : (
            <IconButton onClick={open}>
              <ChevronRightIcon sx={{ color: 'white', fontSize: '30px' }} />
            </IconButton>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              title={translation(item.title)}
              href={item.href}
              isOpen={isOpen}
            />
          ))}
        </Box>
      </Box>
    </>
  )

  if (lgUp) {
    return (
      <CustomDrawer
        className="dashboard-drawer"
        anchor="left"
        open={isOpen}
        variant="permanent"
      >
        {content}
      </CustomDrawer>
    )
  }

  return (
    <Drawer
      className="dashboard-drawer"
      anchor="left"
      onClose={close}
      open={isOpen}
      sx={{ zIndex: 9 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

export default DashboardSidebar
