import React from 'react'
import SEO from '../../common/SEO'
import ForgotPasswordForm from '../../components/form/ForgotPasswordForm'

function ForgotPassword() {
  return (
    <>
      <SEO title="Forgot Password" />
      <div className="login-register-page-wrapper edu-section-gap bg-login">
        <div className="container checkout-page-style center-form">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
