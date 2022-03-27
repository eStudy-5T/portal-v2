import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import ComingSoonOne from '../coming-soon/ComingSoonOne'

function AboutUsTwoCountDown() {
  return (
    <div className="edu-countdown-area edu-section-gap bg-image">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="countdown-style-1">
              <SectionTitle
                classes="text-center text-white mb--60"
                slogan="Upcoming Courses"
                title="Interested In Taking Admission The Next Batch"
              />
              <div className="countdown">
                <ComingSoonOne
                  time={Date.now() + 2443678888}
                  renderB="enable"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsTwoCountDown
