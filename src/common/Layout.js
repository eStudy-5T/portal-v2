import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import VerifyAccountAlert from './global-alert/VerifyAccountAlert'

function Layout({ children }) {
  return (
    <main className="main-wrapper">
      <Header styles="header-style-2" />
      <VerifyAccountAlert />
      {children}
      <Footer />
    </main>
  )
}
export default Layout
