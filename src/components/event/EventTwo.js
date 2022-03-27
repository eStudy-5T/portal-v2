import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { Link } from 'react-router-dom'

function EventTwo({ data, classes, shade, shadow, animationName }) {
  return (
    <ScrollAnimation
      animateIn={animationName || 'fadeInUp'}
      animateOut="fadeInOut"
      animateOnce
      className={classes || 'col-lg-4 col-md-6 col-sm-6 col-12'}
    >
      <div
        className={`edu-event event-grid-1 radius-small ${
          shade === 'enable' ? 'bg-shade' : ''
        } ${shadow === 'enable' ? 'letmeet-event-two-shadow' : ''}`}
      >
        <div className="inner">
          <div className="thumbnail">
            <Link to={`${process.env.PUBLIC_URL}/event-details/${data.id}`}>
              <img
                src={`${process.env.PUBLIC_URL}/images/event/event-02/${data.image}`}
                alt="Event Thumb"
              />
            </Link>
            <div className="top-position status-group left-top">
              <span className="letmeet-status status-06">{data.startDate}</span>
            </div>
          </div>
          <div className="content">
            <ul className="event-meta">
              <li>
                <i className="icon-map-pin-line" />
                {data.location}
              </li>
            </ul>

            <h5 className="title">
              <Link to={`${process.env.PUBLIC_URL}/event-details/${data.id}`}>
                {data.title}
              </Link>
            </h5>
            <div className="read-more-btn">
              <Link
                className="btn-transparent"
                to={`${process.env.PUBLIC_URL}/event-details/${data.id}`}
              >
                Get Ticket
                <i className="icon-arrow-right-line-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  )
}

export default EventTwo
