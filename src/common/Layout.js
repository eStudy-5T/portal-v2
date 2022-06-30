import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import CompactFooter from './footer/CompactFooter'
import VerifyAccountAlert from './global-alert/VerifyAccountAlert'

function Layout({ compactFooter, buttonStyle, disableSticky, children }) {
  return (
    <>
      <main className="main-wrapper">
        <Header
          styles="header-style-2 header-shadow"
          disableSticky={disableSticky}
          buttonStyle={buttonStyle}
        />
        {!disableSticky && <VerifyAccountAlert />}
        {children}
      </main>
      {compactFooter ? <CompactFooter /> : <Footer />}
    </>
  )
}
export default Layout
