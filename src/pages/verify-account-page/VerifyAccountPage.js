import React from 'react'
import SEO from '../../common/SEO'
import { Link } from 'react-router-dom'
import VerifyAccount from '../../components/verify-account/VerifyAccount'

function VerifyAccountPage() {
  return (
    <>
      <SEO title="VerifyAccount" />
      <div className="login-register-page-wrapper edu-section-gap bg-login">
        <div className="container checkout-page-style">
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
              <VerifyAccount />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyAccountPage
