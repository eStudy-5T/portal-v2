import React from 'react'
import SEO from '../../common/SEO'
import { Link } from 'react-router-dom'

function TeacherDashboard() {
  return (
    <>
      <SEO title="Teacher Dashboard" />
      <div className="login-register-page-wrapper edu-section-gap bg-color-white bg-login">
        <div className="container checkout-page-style">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6">
              <h1>On going</h1>
              <Link to="/new-course">Link to create new course page</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherDashboard
