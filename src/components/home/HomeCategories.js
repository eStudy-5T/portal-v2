import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import HomeCategory from '../category/HomeCategory'

function HomeCategories() {
  return (
    <div className="letmeet-home-five-cats edu-about-area about-style-5 edu-section-gapTop bg-color-white">
      <div className="container letmeet-animated-shape">
        <div className="row g-5">
          <div className="col-lg-12">
            <SectionTitle
              slogan="Top Categories"
              title="Browse Popular Category"
            />
          </div>
        </div>
        <div className="row">
          <HomeCategory />
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-07.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-03-05.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-04-06.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCategories
