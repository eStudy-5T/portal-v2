import React from 'react'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import ForgotPasswordForm from '../../components/form/ForgotPasswordForm'

function ForgotPassword() {
  return (
    <>
      <SEO title="Forgot Password" />
      <Layout>
        <BreadcrumbOne
          title="Forgot Password"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Forgot Password"
        />
        <div className="login-register-page-wrapper edu-section-gap bg-color-white">
          <div className="container checkout-page-style">
            <div className="row g-5 justify-content-center">
              <div className="col-lg-6">
                <ForgotPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ForgotPassword
