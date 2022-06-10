import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Avatar,
  ClickAwayListener,
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

// Constants
import ROLE from '../../../utils/constants/role'

const ProfileSection = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { t: translation } = useTranslation()
  const userId = localStorage.getItem('currentUserId')
  const userInfo = useSelector((state) => state.userInfo)
  let role = ''
  if (userInfo.isAdmin) {
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
      <Avatar
        src={userInfo.avatar || CloneAvatar}
        sx={{
          ...theme.typography.mediumAvatar,
          cursor: 'pointer',
          width: 35,
          height: 35
        }}
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
                  <Box sx={{ p: 1 }}>
                    <Stack spacing={0.5}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold' }}
                        color="var(--color-primary)"
                      >
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
                        minWidth: 150,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemIcon-root': {
                          minWidth: 40
                        },
                        '& .MuiListItemText-root': {
                          m: 0
                        },
                        '& .MuiListItemButton-root': {
                          p: 1
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
                          <IconBooks
                            color="var(--color-primary)"
                            stroke={1.5}
                            size="1.5rem"
                          />
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
                            <IconLayoutDashboard
                              color="var(--color-primary)"
                              stroke={1.5}
                              size="1.5rem"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="button">
                                {translation('dropdown.teacherDashboard')}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      )}
                      <ListItemButton
                        sx={{ borderRadius: '12px' }}
                        selected={selectedIndex === 2}
                        onClick={(event) =>
                          handleListItemClick(event, 2, `/account-setting`)
                        }
                      >
                        <ListItemIcon>
                          <IconSettings
                            color="var(--color-primary)"
                            stroke={1.5}
                            size="1.5rem"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="button">
                              {translation('dropdown.accountSettings')}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      {role === 'Administrator' && (
                        <ListItemButton
                          sx={{ borderRadius: '12px' }}
                          selected={selectedIndex === 3}
                          onClick={(event) =>
                            handleListItemClick(event, 3, '/manage-users')
                          }
                        >
                          <ListItemIcon>
                            <IconUsers
                              color="var(--color-primary)"
                              stroke={1.5}
                              size="1.5rem"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="button">
                                {translation('dropdown.manageUsers')}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      )}
                      <ListItemButton
                        sx={{ borderRadius: '12px' }}
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout
                            color="var(--color-primary)"
                            stroke={1.5}
                            size="1.5rem"
                          />
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
