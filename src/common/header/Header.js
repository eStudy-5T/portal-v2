import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderSticky from './HeaderSticky'
import ResponsiveMenu from './ResponsiveMenu'
import Globe from '../../components/globe/globe'
import ProfileSection from './profile-section/ProfileSection'

// i18n
import { useTranslation } from 'react-i18next'

import useAuthenticate from '../../hooks/use-authenticate'

function Header({
  styles,
  disableSticky,
  buttonStyle,
  permanentSticky = false,
  disableAnimation = false
}) {
  const [offcanvasShow, setOffcanvasShow] = useState(false)
  const [searchPopup, setSearchPopup] = useState(false)
  const [isAuthenticated] = useAuthenticate()

  const { t: translation } = useTranslation()

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

  const sticky = permanentSticky ? HeaderSticky(-1, true) : HeaderSticky(200)
  const classes = `header-default ${sticky ? 'sticky' : ''}`
  const stickyStatus = disableSticky ? '' : ' header-sticky'
  const stickyAnimated = disableAnimation ? '' : 'animated'
  return (
    <>
      <header
        className={`edu-header ${stickyStatus} ${stickyAnimated} ${
          styles || ''
        } ${classes || ''}`}
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

          {/* <div className="col-lg-6 d-none d-xl-block">
            <nav className="mainmenu-nav d-none d-lg-block">
              <Nav />
            </nav>
          </div> */}

          <div className="col-xl-9 col-lg-8 col-md-6 col-6">
            <div className="header-right d-flex justify-content-end">
              <div className="header-menu-bar header-quote">
                <div className="quote-icon">
                  <button onClick={onCanvasHandler}>
                    <i className="ri-menu-line" />
                  </button>
                </div>

                {isAuthenticated && (
                  <div className="quote-icon">
                    <button>
                      <i className="ri-notification-line" />
                    </button>
                  </div>
                )}

                <Globe size="2em" />

                {isAuthenticated ? (
                  <div className="quote-icon">
                    <ProfileSection style={{ zIndex: 999 }}></ProfileSection>
                  </div>
                ) : (
                  <div className="mx-2 mx-sm-3">
                    <Link
                      className={`edu-btn btn-medium left-icon header-button ${
                        buttonStyle || ''
                      }`}
                      to={`${process.env.PUBLIC_URL}/login`}
                    >
                      <i className="ri-user-line" />
                      <div className="d-none d-sm-inline">
                        {translation('auth.login')}
                      </div>
                    </Link>
                  </div>
                )}
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

export default Header
