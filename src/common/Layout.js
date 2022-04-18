import React from 'react'
import HeaderTwo from './header/HeaderTwo'
import Footer from './footer/Footer'
import VerifyAccountAlert from './global-alert/VerifyAccountAlert'

function Layout({ children }) {
  return (
    <main className="main-wrapper">
      <HeaderTwo styles="header-style-2" />
      <VerifyAccountAlert />
      {children}
      <Footer />
    </main>
  )
}
export default Layout
