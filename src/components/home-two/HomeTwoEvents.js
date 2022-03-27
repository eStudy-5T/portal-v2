import React from 'react'
import SectionTitle from '../section-title/SectionTitle'
import EventOne from '../event/EventOne'
import EventData from '../../data/event/EventData.json'

function HomeTwoEvents() {
  const EventItems = EventData.slice(0, 3)
  return (
    <div className="edu-event-area letmeet-home-two-event edu-section-gap bg-image video-gallery-overlay-area">
      <div className="container letmeet-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              classes="text-center"
              slogan="Let’s Learn Together"
              title="Upcoming Educational Events"
            />
          </div>
        </div>
        <div className="row g-5 mt--25">
          {EventItems.map((item) => (
            <EventOne key={item.id} data={item} bgWhite="enable" />
          ))}
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-03-07.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-02-04.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-05-02.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-4">
            <img src="/images/shapes/shape-13-05.png" alt="Shape Thumb" />
          </div>
          <div className="shape shape-1">
            <span className="shape-dot" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeTwoEvents
