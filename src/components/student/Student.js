import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { Link } from 'react-router-dom'

function Student({ data, classes }) {
  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeInOut"
      animateOnce
      className={classes || 'col-lg-3 col-md-6 col-sm-6 col-12 mt--45'}
    >
      <div className="edu-instructor-grid edu-instructor-1">
        <div className="inner">
          <div className="thumbnail">
            <Link to={`.`}>
              <img
                src={`${process.env.PUBLIC_URL}/images/instructor/instructor-01/instructor-1.jpg`}
                alt="Student"
                style={{
                  borderRadius: '150px',
                  height: '230px',
                  width: '230px'
                }}
              />
            </Link>
          </div>
        </div>
        <div className="edu-instructor-info">
          <h5 className="title">{data.lastName + ' ' + data.firstName}</h5>
        </div>
      </div>
    </ScrollAnimation>
  )
}
export default Student
