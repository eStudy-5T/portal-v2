import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <ul className="mainmenu">
      <li className="has-droupdown">
        <Link to="/">Home</Link>
      </li>

      <li className="has-droupdown">
        <Link to="/courses">Courses</Link>
      </li>

      <li className="has-droupdown">
        <Link to="/about-us">About Us</Link>
      </li>

      <li className="has-droupdown">
        <Link to="/contact-us">Contact Us</Link>
      </li>
    </ul>
  )
}
export default Nav
