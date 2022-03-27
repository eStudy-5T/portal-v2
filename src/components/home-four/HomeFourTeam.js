import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import InstructorOne from '../instructor/InstructorOne'
import InstructorData from '../../data/instructor/InstructorData.json'

function HomeFourTeam() {
  const TeamMembers = InstructorData.slice(0, 4)
  return (
    <div className="letmeet-home-four-team bg-image edu-team-area">
      <div className="container letmeet-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              classes="text-center"
              slogan="Skilled Instructor"
              title="Introduce Our Life Coaches"
            />
          </div>
        </div>

        <div className="row row--20">
          {TeamMembers.map((item) => (
            <InstructorOne key={item.id} data={item} />
          ))}
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-07-02.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-04-06.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-31.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeFourTeam
