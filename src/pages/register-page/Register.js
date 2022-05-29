import React from 'react'
import SEO from '../../common/SEO'
import RegisterForm from '../../components/form/RegisterForm'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <>
      <SEO title="Register" />
      <div className="login-register-page-wrapper edu-section-gap bg-color-white bg-login p-relative">
        <div className="container checkout-page-style center-form">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6">
              <div className="logo">
                <Link to={`${process.env.PUBLIC_URL}/`}>
                  <img
                    className="logo-light"
                    src="/images/logo/logo.png"
                    alt="Main Logo"
                  />
                </Link>
              </div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
