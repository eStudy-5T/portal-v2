import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import InstructorThree from '../instructor/InstructorThree'
import InstructorData from '../../data/instructor/InstructorData.json'

function AboutUsThreeInstructor() {
  const Instructors = InstructorData.slice(0, 4)
  return (
    <div className="letmeet-about-three-team edu-instructor-area edu-section-gap bg-color-white">
      <div className="container letmeet-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              classes="text-center"
              slogan="Team Member"
              title="Meet Our Instructor"
            />
          </div>
        </div>
        <div className="row g-5 mt--20">
          {Instructors.map((item) => (
            <InstructorThree key={item.id} data={item} />
          ))}
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-04-01.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-25-01.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-03.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-4">
            <img src="/images/shapes/shape-15-05.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsThreeInstructor
