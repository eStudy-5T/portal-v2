import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import AboutInstructor from '../instructor/AboutInstructor'
import InstructorData from '../../data/instructor/InstructorData.json'

function AboutInstructorPage() {
  const TeamMembers = InstructorData.slice(0, 3)
  return (
    <div className="letmeet-about-us-two-instructor edu-elements-area edu-section-gap">
      <div className="container letmeet-animated-shape">
        <div className="row g-5">
          <div className="col-lg-12">
            <SectionTitle
              classes="text-center"
              slogan="LetMeet Team"
              title="Introduce Our Team"
            />
          </div>
        </div>
        <div className="row g-5 mt--5">
          {TeamMembers.map((item) => (
            <AboutInstructor
              classes="col-lg-4 col-md-6 col-sm-6 col-12 mt--45"
              key={item.id}
              data={item}
            />
          ))}
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-03-05.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-08.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-34.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-4">
            <img src="/images/shapes/shape-27-02.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutInstructorPage
