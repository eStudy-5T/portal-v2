import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import FeatureTwo from '../feature/FeatureTwo'

function HomeFourServices() {
  return (
    <div className="letmeet-home-four-service edu-service-area edu-section-gap bg-color-white position-relative border-bottom-1">
      <div className="container letmeet-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              classes="text-center"
              slogan="What We Offer"
              title="Learn New Skills When And <br /> Where You Like"
            />
          </div>
        </div>

        <FeatureTwo bgColor="bg-grey" />

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-29.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-03-06.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-02-06.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-4">
            <img src="/images/shapes/shape-19-02.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeFourServices
