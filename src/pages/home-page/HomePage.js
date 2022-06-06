import React from 'react'
import SEO from '../../common/SEO'
import VerifyAccountAlert from '../../common/global-alert/VerifyAccountAlert'
import Header from '../../common/header/Header'
import BannerTwo from '../../components/banner/BannerTwo'
import Footer from '../../common/footer/Footer'
import { t } from 'i18next'

function HomePage() {
  return (
    <>
      <SEO title={t('nav.home')} />

      <Header styles="header-transparent header-style-2" />

      <VerifyAccountAlert />

      <BannerTwo />

      <Footer />
    </>
  )
}

export default HomePage
