import React from 'react'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import LoginForm from '../../components/form/LoginForm'

function Login() {
  return (
    <>
      <SEO title="Login" />
      <Layout>
        <BreadcrumbOne
          title="Login"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Login"
        />
        <div className="login-register-page-wrapper edu-section-gap bg-color-white">
          <div className="container checkout-page-style">
            <div className="row g-5 justify-content-center">
              <div className="col-lg-6">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Login
