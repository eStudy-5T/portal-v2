import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import HomeServiceCategory from '../category/HomeServiceCategory'

function HomeService() {
  return (
    <div className="sercice-area letmeet-service-four edu-section-gap bg-color-white">
      <div className="container letmeet-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              classes="text-center"
              slogan="Course Categories"
              title="Popular Topics To Learn"
            />
          </div>
        </div>

        <HomeServiceCategory />

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-11-02.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-02-03.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-20.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeService
