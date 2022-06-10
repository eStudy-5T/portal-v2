/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import ScrollTopButton from './ScrollTopButton'
import { Typography } from '@mui/material'

// i18
import { useTranslation } from 'react-i18next'

function CompactFooter() {
  const { t: translation } = useTranslation()

  return (
    <>
      <footer className="letmeet-footer-one edu-footer footer-style-default">
        <div className="compact-footer__top">
          <div className="container compact-footer__content">
            <div className="compact-footer__content-nav">
              <div className="compact-footer__content-nav_logo">
                <Link to={`${process.env.PUBLIC_URL}/`}>
                  <img
                    className="logo-light"
                    src="/images/logo/logo-white.png"
                    alt="Footer Logo"
                  />
                </Link>
              </div>
              <ul className="compact-footer__content-nav_list">
                <li>
                  <Link to="/privacy-policy">
                    {translation('footer.privatePolicy')}
                  </Link>
                </li>
                <li>
                  <Link to="/about-us">{translation('footer.aboutUs')}</Link>
                </li>
                <li>
                  <Link to="/contact-us">
                    {translation('footer.contactUs')}
                  </Link>
                </li>
                <li>
                  <Link to="/faq">{translation('footer.faqQuestion')}</Link>
                </li>
              </ul>
              <Typography fontSize={16} align="center" color="white">
                Copyright © 2022 LetMeet. All Rights Reserved.
              </Typography>
            </div>
          </div>
        </div>
      </footer>
      <ScrollTopButton />
    </>
  )
}

export default CompactFooter
