import { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import HeaderSticky from './HeaderSticky'
import ResponsiveMenu from './ResponsiveMenu'
import Globe from '../../components/globe/globe'
import { Box, Menu, MenuItem, Fade } from '@mui/material'

// i18n
import { useTranslation } from 'react-i18next'

import useAuthenticate from '../../hooks/use-authenticate'
import { logOutUser } from '../../utils/helpers/user-helper'

function HeaderTwo({ styles, disableSticky, searchDisable, buttonStyle }) {
  const [offcanvasShow, setOffcanvasShow] = useState(false)
  const [searchPopup, setSearchPopup] = useState(false)
  const [isOpenSettings, setOpenSettings] = useState(null)
  const isAuthenticated = useAuthenticate()

  const { t: translation } = useTranslation()

  const openSettings = (event) => setOpenSettings(event.currentTarget)
  const handleCloseSettingsMenu = () => setOpenSettings(null)

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleCloseSettingsMenu)
    return () => {
      window.removeEventListener('scroll', handleCloseSettingsMenu)
    }
  })

  const onCanvasHandler = () => {
    setOffcanvasShow((prevState) => !prevState)
  }

  const onSearchHandler = () => {
    setSearchPopup((prevState) => !prevState)
  }

  if (searchPopup) {
    document.body.classList.add('search-popup-active')
  } else {
    document.body.classList.remove('search-popup-active')
  }

  const sticky = HeaderSticky(200)
  const classes = `header-default ${sticky ? 'sticky' : ''}`
  const stickyStatus = disableSticky ? '' : ' header-sticky'
  return (
    <>
      <header
        className={`edu-header ${stickyStatus} ${styles || ''} ${
          classes || ''
        }`}
      >
        <div className="row align-items-center">
          <div className="col-lg-4 col-xl-3 col-md-6 col-6">
            <div className="logo">
              <Link to={`${process.env.PUBLIC_URL}/`}>
                <img
                  className="logo-light"
                  src="/images/logo/logo.png"
                  alt="Main Logo"
                />
              </Link>
            </div>
          </div>

          <div className="col-lg-6 d-none d-xl-block">
            <nav className="mainmenu-nav d-none d-lg-block">
              <Nav />
            </nav>
          </div>

          <div className="col-lg-8 col-xl-3 col-md-6 col-6">
            <div className="header-right d-flex justify-content-end">
              <div className="header-menu-bar">
                {!searchDisable && (
                  <div className="quote-icon quote-search">
                    <button
                      className="white-box-icon search-trigger header-search"
                      onClick={onSearchHandler}
                    >
                      <i className="ri-search-line" />
                    </button>
                  </div>
                )}
                <div className="quote-icon quote-user d-none d-md-block ml--15 ml_sm--5">
                  {isAuthenticated ? (
                    <Box>
                      <div
                        aria-controls="menu-settings"
                        aria-haspopup="true"
                        className="edu-header__authenticated"
                        onClick={openSettings}
                      >
                        <i className="ri-user-line" />
                      </div>
                      <Menu
                        id="menu-settings"
                        transformOrigin={{
                          horizontal: 'center',
                          vertical: 'top'
                        }}
                        anchorOrigin={{
                          horizontal: 'right',
                          vertical: 'bottom'
                        }}
                        anchorEl={isOpenSettings}
                        open={Boolean(isOpenSettings)}
                        onClose={handleCloseSettingsMenu}
                        TransitionComponent={Fade}
                        disableScrollLock={true}
                        className="edu-header__dropdown"
                      >
                        <Link to="/teacher-dashboard">
                          <MenuItem>
                            {translation('dropdown.teacherDashboard')}
                          </MenuItem>
                        </Link>

                        <Link to="#">
                          <MenuItem onClick={() => logOutUser()}>
                            {translation('auth.logOut')}
                          </MenuItem>
                        </Link>
                      </Menu>
                    </Box>
                  ) : (
                    <Link
                      className={`edu-btn btn-medium left-icon header-button ${
                        buttonStyle || ''
                      }`}
                      to={`${process.env.PUBLIC_URL}/login`}
                    >
                      <i className="ri-user-line" />
                      {translation('auth.login')}
                    </Link>
                  )}
                </div>
                <div className="quote-icon quote-user d-block d-md-none ml--15 ml_sm--5">
                  {isAuthenticated ? (
                    <button
                      className="white-box-icon"
                      onClick={() => logOutUser()}
                    >
                      <i className="ri-logout-box-r-line" />
                    </button>
                  ) : (
                    <Link
                      to={`${process.env.PUBLIC_URL}/login`}
                      className="white-box-icon"
                      href="#"
                    >
                      <i className="ri-user-line" />
                    </Link>
                  )}
                </div>
                <Globe size="2.2em" />
              </div>
              <div className="mobile-menu-bar ml--15 ml_sm--5 d-block d-xl-none">
                <div className="hamberger">
                  <button
                    className="white-box-icon hamberger-button header-menu"
                    onClick={onCanvasHandler}
                  >
                    <i className="ri-menu-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ResponsiveMenu
        show={offcanvasShow}
        onClose={onCanvasHandler}
        showSearch={searchPopup}
        onSearch={onSearchHandler}
      />
    </>
  )
}

export default HeaderTwo
