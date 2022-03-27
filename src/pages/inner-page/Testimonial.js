import React from 'react'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import SectionTitle from '../../components/section-title/SectionTitle'
import TestimonialFour from '../../components/testimonial/TestimonialFour'
import TestimonialSectionFour from '../../components/testimonial-section/TestimonialSectionFour'
import TestimonialSectionOne from '../../components/testimonial-section/TestimonialSectionOne'
import TestimonialSectionTwo from '../../components/testimonial-section/TestimonialSectionTwo'

function Testimonial() {
  return (
    <>
      <SEO title="Testimonial" />
      <Layout>
        <BreadcrumbOne
          title="Testimonial"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Testimonial"
        />
        <div className="letmeet-home-two-testimonial edu-testimonial-area testimonial-card-box-bg edu-section-gap bg-image">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <SectionTitle
                  classes="text-center"
                  slogan="Testimonial"
                  title="Our Students Feedback"
                />
              </div>
            </div>
            <div className="edu-testimonial-activation testimonial-item-3 mt--40 edu-slick-button">
              <TestimonialFour />
            </div>
          </div>
        </div>

        <TestimonialSectionFour />

        <TestimonialSectionOne />

        <TestimonialSectionTwo />
      </Layout>
    </>
  )
}

export default Testimonial
