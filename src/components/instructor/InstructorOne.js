import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { Link } from 'react-router-dom'
import { slugify } from '../../utils'

function InstructorOne({ data, classes }) {
  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeInOut"
      animateOnce
      className={classes || 'col-lg-3 col-md-6 col-sm-6 col-12 mt--45'}
    >
      <div className="edu-instructor-grid edu-instructor-1">
        <div className="edu-instructor">
          <div className="inner">
            <div className="thumbnail">
              <Link
                to={`${process.env.PUBLIC_URL}/instructor-details/${slugify(
                  data.name
                )}`}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/instructor/instructor-01/${data.image}`}
                  alt="Team Member"
                />
              </Link>
            </div>
            <div className="team-share-info">
              <a className="linkedin" href={data.linkedInUrl}>
                <i className="icon-linkedin" />
              </a>
              <a className="facebook" href={data.facebookUrl}>
                <i className="icon-Fb" />
              </a>
              <a className="twitter" href={data.twitterUrl}>
                <i className="icon-Twitter" />
              </a>
            </div>
          </div>
        </div>
        <div className="edu-instructor-info">
          <h5 className="title">
            <Link
              to={`${process.env.PUBLIC_URL}/instructor-details/${slugify(
                data.name
              )}`}
            >
              {data.name}
            </Link>
          </h5>
          <span className="desc">{data.designation}</span>
        </div>
      </div>
    </ScrollAnimation>
  )
}
export default InstructorOne
