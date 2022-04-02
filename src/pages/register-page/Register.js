import React from 'react'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import RegisterForm from '../../components/form/RegisterForm'

function Register() {
  return (
    <>
      <SEO title="Register" />
      <Layout>
        <BreadcrumbOne
          title="Register"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Register"
        />

        <div className="login-register-page-wrapper edu-section-gap bg-color-white">
          <div className="container checkout-page-style">
            <div className="row g-5 justify-content-center">
              <div className="col-lg-6">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Register
