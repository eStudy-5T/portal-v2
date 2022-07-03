import { useSelector, useDispatch } from 'react-redux'
import { dashboardDrawerActions } from '../../redux/store/dashboard-drawer'
import { Box, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import DashboardSidebar from './dashboard-sidebar'
import Header from '../../common/header/Header'
import DashboardIcon from '@mui/icons-material/Dashboard'

const DashboardLayoutRoot = styled('div')(({ theme, issidebaropen }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: issidebaropen === 'true' ? 280 : 65
  }
}))

const DashboardLayout = (props) => {
  const { children, items } = props
  const dispatch = useDispatch()
  const lgUp = useMediaQuery('(min-width:1200px)', {
    defaultMatches: true
  })
  const isSidebarOpen = useSelector(
    (state) => state.dashboardDrawer.isSidebarOpen
  )

  return (
    <>
      <Header styles="header-style-2" permanentSticky disableAnimation />
      <DashboardLayoutRoot issidebaropen={isSidebarOpen.toString()}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            marginTop: '80px'
          }}
        >
          {!lgUp && (
            <button
              className="white-box-icon header-menu mt-2 ml--5"
              onClick={() => dispatch(dashboardDrawerActions.openDrawer())}
            >
              <DashboardIcon />
            </button>
          )}
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardSidebar
        lgUp={lgUp}
        open={() => dispatch(dashboardDrawerActions.openDrawer())}
        close={() => dispatch(dashboardDrawerActions.closeDrawer())}
        isOpen={isSidebarOpen}
        items={items}
      />
    </>
  )
}

export default DashboardLayout
