import React from 'react'
import SEO from '../../common/SEO'
import RegisterForm from '../../components/form/RegisterForm'

function Register() {
  return (
    <>
      <SEO title="Register" />
      <div className="login-register-page-wrapper edu-section-gap bg-color-white bg-login">
        <div className="container checkout-page-style center-form">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
