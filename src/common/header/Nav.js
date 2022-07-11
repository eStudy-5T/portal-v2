import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
// i18
import { useTranslation } from 'react-i18next'

function Nav() {
  const { t: translation } = useTranslation()
  const userInfo = useSelector((state) => state.userInfo)

  return (
    <ul className="mainmenu">
      <li className="has-droupdown">
        <Link to="/">{translation('nav.home')}</Link>
      </li>

      <li className="has-droupdown">
        <Link to="/courses">{translation('nav.courses')}</Link>
      </li>
      {!userInfo.isVerifiedToTeach && (
        <li className="has-droupdown">
          <Link to="/submit-profile">{translation('nav.applyToTeach')}</Link>
        </li>
      )}
      <li className="has-droupdown">
        <Link to="/about-us">{translation('nav.aboutUs')}</Link>
      </li>

      <li className="has-droupdown">
        <Link to="/contact-us">{translation('nav.contactUs')}</Link>
      </li>
    </ul>
  )
}
export default Nav
