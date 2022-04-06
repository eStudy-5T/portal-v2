import React from 'react'
import SEO from '../../common/SEO'
import LoginForm from '../../components/form/LoginForm'

function Login() {
  return (
    <>
      <SEO title="Login" />
      <div className="login-register-page-wrapper edu-section-gap bg-login">
        <div className="container checkout-page-style center-form">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
