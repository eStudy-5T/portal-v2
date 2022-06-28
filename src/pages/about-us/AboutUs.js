import React from 'react'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import AboutIntroSection from '../../components/about/AboutIntroSection'
import AboutFeatures from '../../components/about/AboutFeatures'
import AboutService from '../../components/about/AboutService'
import AboutInstructor from '../../components/about/AboutInstructor'
import AboutTestimonial from '../../components/about/AboutTestimonial'

function AboutUsTwo() {
  return (
    <>
      <SEO title="About Us" />
      <Layout>
        <AboutIntroSection />
        <AboutInstructor />
        <AboutFeatures />
        <AboutService />
        <AboutTestimonial />
      </Layout>
    </>
  )
}

export default AboutUsTwo
