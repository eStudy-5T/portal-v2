import React from 'react'
import HeaderOne from './header/HeaderOne'
import Footer from './footer/Footer'
import VerifyAccountAlert from './global-alert/VerifyAccountAlert'

function Layout({ children }) {
  return (
    <main className="main-wrapper">
      <HeaderOne />
      <VerifyAccountAlert />
      {children}
      <Footer />
    </main>
  )
}
export default Layout
