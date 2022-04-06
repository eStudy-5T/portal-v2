import React from 'react'
import HeaderOne from './header/HeaderOne'
import Footer from './footer/Footer'

function Layout({ children }) {
  return (
    <main className="main-wrapper">
      <HeaderOne />
      {children}
      <Footer />
    </main>
  )
}
export default Layout
