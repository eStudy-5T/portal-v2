import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { Link } from 'react-router-dom'

function EventOne({ data, classes, bgWhite }) {
  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeInOut"
      animateOnce
      className={classes || 'col-lg-12'}
    >
      <div
        className={`edu-event event-list radius-small ${
          bgWhite === 'enable' ? 'bg-white' : ''
        }`}
      >
        <div className="inner">
          <div className="thumbnail">
            <Link to={`${process.env.PUBLIC_URL}/event-details/${data.id}`}>
              <img
                src={`${process.env.PUBLIC_URL}/images/event/event-01/${data.image}`}
                alt="Event Thumb"
              />
            </Link>
          </div>
          <div className="content">
            <div className="content-left">
              <h5 className="title">
                <Link to={`${process.env.PUBLIC_URL}/event-details/${data.id}`}>
                  {data.title}
                </Link>
              </h5>
              <ul className="event-meta">
                <li>
                  <i className="icon-calendar-2-line" />
                  {data.startDate}
                </li>
                <li>
                  <i className="icon-time-line" />
                  {data.startTime}
                </li>
                <li>
                  <i className="icon-map-pin-line" />
                  {data.location}
                </li>
              </ul>
            </div>
            <div className="read-more-btn">
              <Link
                className="edu-btn btn-dark"
                to={`${process.env.PUBLIC_URL}/event-details/${data.id}`}
              >
                Book A Seat
                <i className="icon-arrow-right-line-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  )
}

export default EventOne
