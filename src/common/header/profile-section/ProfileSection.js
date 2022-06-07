import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Avatar,
  Chip,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material'

// project imports
import MainCard from './MainCard'
import Transitions from './Transitions'
import { logOutUser } from '../../../utils/helpers/user-helper'
import CloneAvatar from '../../../assets/images/clone.png'

// Icons
import {
  IconLogout,
  IconSettings,
  IconBooks,
  IconLayoutDashboard,
  IconUsers
} from '@tabler/icons'

// i18n
import { useTranslation } from 'react-i18next'

const ProfileSection = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { t: translation } = useTranslation()
  const userId = localStorage.getItem('currentUserId')
  const userInfo = useSelector((state) => state.userInfo)
  let role = ''
  if (userInfo.roleId === 2) {
    role = 'Administrator'
  } else {
    if (userInfo.isVerifiedToTeach === true) role = 'Teacher'
    else role = 'Student'
  }
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [open, setOpen] = useState(false)
  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null)
  const handleLogout = async () => {
    logOutUser()
    navigate('/')
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index)
    handleClose(event)

    if (route && route !== '') {
      navigate(route)
    }
  }
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  return (
    <>
      <Chip
        sx={{
          height: '50px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: 'var(--color-primary)',
          backgroundColor: 'var(--color-white)',
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: 'var(--color-primary)',
            background: `${'var(--color-primary)'}!important`,
            color: 'var(--color-primary)',
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={userInfo.avatar || CloneAvatar}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '0 0 0 12px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="2rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {userInfo.firstName + ' ' + userInfo.lastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textTransform: 'capitalize',
                          fontStyle: 'italic'
                        }}
                      >
                        {role}
                      </Typography>
                    </Stack>
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 200,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0
                        }
                      }}
                    >
                      <ListItemButton
                        sx={{ borderRadius: '12px' }}
                        selected={selectedIndex === 0}
                        onClick={(event) =>
                          handleListItemClick(
                            event,
                            0,
                            `/enrolled-courses/${userId}/`
                          )
                        }
                      >
                        <ListItemIcon>
                          <IconBooks stroke={1.5} size="1.5rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="button">
                              {translation('dropdown.myCourses')}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      {role !== 'Student' && (
                        <ListItemButton
                          sx={{ borderRadius: '12px' }}
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, 1, '/teacher-dashboard')
                          }
                        >
                          <ListItemIcon>
                            <IconLayoutDashboard stroke={1.5} size="1.5rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="button">
                                    {translation('dropdown.teacherDashboard')}
                                  </Typography>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                      )}
                      {role === 'Administrator' && (
                        <ListItemButton
                          sx={{ borderRadius: '12px' }}
                          selected={selectedIndex === 2}
                          onClick={(event) =>
                            handleListItemClick(event, 2, '/manage-users')
                          }
                        >
                          <ListItemIcon>
                            <IconUsers stroke={1.5} size="1.5rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="button">
                                    {translation('dropdown.manageUsers')}
                                  </Typography>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                      )}
                      <ListItemButton
                        sx={{ borderRadius: '12px' }}
                        selected={selectedIndex === 3}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.5rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="button">
                              {translation('auth.logOut')}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  )
}

export default ProfileSection
