import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import SectionTitle from '../section-title/SectionTitle'
import CourseTypeFive from '../course/CourseTypeFive'
import CourseData from '../../data/course/CourseData.json'
import { TheeColumnCarousel } from '../../utils/configs/ui-config'

function HomeFiveCourses() {
  return (
    <div className="letmeet-home-five-course slider-dots edu-course-area edu-section-gap bg-image">
      <div className="container letmeet-animated-shape">
        <div className="row g-5">
          <div className="col-lg-6">
            <SectionTitle
              classes="text-start"
              slogan="Our Courses"
              title="Featured Courses"
            />
          </div>
          <div className="col-lg-6">
            <div className="view-more-btn text-end">
              <Link className="edu-btn" to="/course-1">
                Browse All Courses
                <i className="icon-arrow-right-line-right" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row g-5 mt--10">
          <div className="col-lg-12">
            <Slider
              className="slick-activation-wrapper course-activation-3 edu-slick-button"
              {...TheeColumnCarousel}
            >
              {CourseData.slice(0, 6).map((item) => (
                <div className="single-slick-card" key={item.id}>
                  <CourseTypeFive data={item} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-13-10.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-04-03.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-15-03.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-4">
            <img src="/images/shapes/shape-03-07.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeFiveCourses
