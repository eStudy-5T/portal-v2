import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import HomeTestimonialSection from '../testimonial/HomeTestimonialSection'

function HomeTestimonial() {
  return (
    <div className="edu-testimonial-area letmeet-home-two-testimonial bg-color-white testimonial-card-box-bg edu-section-gap position-relative bg-image">
      <div className="container letmeet-animated-shape">
        <div className="row g-5">
          <div className="col-lg-12">
            <SectionTitle
              classes="text-center"
              slogan="Testimonial"
              title="Our Lovely Students Feedback"
            />
          </div>
        </div>
        <div className="edu-testimonial-activation testimonial-item-3 mt--40 edu-slick-button">
          <HomeTestimonialSection />
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-23.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-14-02.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeTestimonial
