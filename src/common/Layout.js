import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import CompactFooter from './footer/CompactFooter'
import VerifyAccountAlert from './global-alert/VerifyAccountAlert'

function Layout({
  compactFooter,
  buttonStyle,
  searchDisable,
  disableSticky,
  children
}) {
  return (
    <>
      <main className="main-wrapper">
        <Header
          styles="header-style-2"
          disableSticky={disableSticky}
          searchDisable={searchDisable}
          buttonStyle={buttonStyle}
        />
        <VerifyAccountAlert />
        {children}
      </main>
      {compactFooter ? <CompactFooter /> : <Footer />}
    </>
  )
}
export default Layout
