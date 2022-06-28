import React from 'react'
import SEO from '../../common/SEO'
import VerifyAccountAlert from '../../common/global-alert/VerifyAccountAlert'
import Header from '../../common/header/Header'
import Banner from '../../components/banner/Banner'
import HomeService from '../../components/home/HomeService'
import AboutIntroSection from '../../components/about/AboutIntroSection'
import HomeTestimonial from '../../components/home/HomeTestimonial'
import HomeCategories from '../../components/home/HomeCategories'
import AboutFeatures from '../../components/about/AboutFeatures'
import HomeBlog from '../../components/home/HomeBlog'
import CallToAction from '../../components/cta/CallToAction'
import Footer from '../../common/footer/Footer'
import { t } from 'i18next'

function HomePage() {
  return (
    <>
      <SEO title={t('nav.home')} />
      <Header styles="header-transparent header-style-2" />
      <VerifyAccountAlert />
      <Banner />
      <HomeCategories />
      <HomeService />
      <AboutIntroSection />
      <HomeTestimonial />
      <AboutFeatures wrapperClass="edu-section-gapBottom" />
      <CallToAction />
      <HomeBlog />
      <Footer />
    </>
  )
}

export default HomePage
