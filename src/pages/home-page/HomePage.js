import React from 'react'
import SEO from '../../common/SEO'
import VerifyAccountAlert from '../../common/global-alert/VerifyAccountAlert'
import HeaderTwo from '../../common/header/HeaderTwo'
import BannerTwo from '../../components/banner/BannerTwo'
import HomeTwoService from '../../components/home-two/HomeTwoService'
import AboutFour from '../../components/about/AboutFour'
import HomeTwoCourses from '../../components/home-two/HomeTwoCourses'
import HomeTwoEvents from '../../components/home-two/HomeTwoEvents'
import HomeTwoTestimonial from '../../components/home-two/HomeTwoTestimonial'
import HomeFiveCategories from '../../components/home-two/HomeFiveCategories'
import AboutOne from '../../components/about/AboutOne'
import CallToActionOne from '../../components/cta/CallToActionOne'
import HomeTwoBlog from '../../components/home-two/HomeTwoBlog'
import Footer from '../../common/footer/Footer'

function HomePage() {
  return (
    <>
      <SEO title="Home" />

      <HeaderTwo styles="header-transparent header-style-2" />

      <VerifyAccountAlert />

      <BannerTwo />

      <HomeFiveCategories />

      <HomeTwoService />

      <AboutFour />

      <HomeTwoCourses />

      <HomeTwoEvents />

      <HomeTwoTestimonial />

      <AboutOne wrapperClass="edu-section-gapBottom" />

      <CallToActionOne />

      <HomeTwoBlog />

      <Footer />
    </>
  )
}

export default HomePage
