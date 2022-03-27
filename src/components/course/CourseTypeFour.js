import React from 'react'
import { Link } from 'react-router-dom'
import { slugify } from '../../utils'
import InstructorData from '../../data/instructor/InstructorData.json'

function CourseTypeFour({ data, classes, bgWhite }) {
  const indexOfInstructor = InstructorData.findIndex(
    (instructor) => slugify(instructor.name) === slugify(data.instructor)
  )
  const instructorThumb = InstructorData[indexOfInstructor].image

  return (
    <div
      className={`edu-card card-type-4 radius-small letmeet-course-style-four ${
        classes || ''
      } ${bgWhite === 'enable' ? 'bg-white' : ''}`}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}>
            <img
              className="w-100"
              src={`${process.env.PUBLIC_URL}/images/course/course-01/${data.image}`}
              alt="Course Thumb"
            />
          </Link>
          <div className="wishlist-top-right">
            <button className="wishlist-btn">
              <i className="icon-Heart" />
            </button>
          </div>
          {data.featured === true && (
            <div className="top-position status-group left-top">
              <span className="letmeet-status status-04">Featured</span>
            </div>
          )}
        </div>
        <div className="content">
          <div className="card-top">
            <div className="author-meta">
              <div className="author-thumb">
                <Link
                  to={`${process.env.PUBLIC_URL}/instructor-details/${slugify(
                    data.instructor
                  )}`}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/instructor/instructor-small/${instructorThumb}`}
                    alt="Author Thumb"
                  />
                  <span className="author-title">{data.instructor}</span>
                </Link>
              </div>
            </div>
          </div>
          <ul className="edu-meta meta-03">
            <li className="meta-lessons">
              <i className="icon-file-list-4-line" />
              {data.lesson} Lessons
            </li>
            <li className="meta-clock">
              <i className="icon-time-line" />
              {data.durationInHourMinute}
            </li>
            <li className="meta-user">
              <i className="icon-group-line" />
              {data.student}
            </li>
          </ul>
          <h6 className="title">
            <Link to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}>
              {data.title}
            </Link>
          </h6>
          <div className="card-bottom">
            <div className="price-list price-style-03">
              {data.price === '0' ? (
                <div className="price current-price">Free</div>
              ) : (
                <div className="price current-price">${data.price}</div>
              )}
              {data.oldPrice && (
                <div className="price old-price">${data.oldPrice}</div>
              )}
            </div>
            <div className="edu-rating rating-default">
              <div className="rating letmeet-course-rating-stars">
                <i className="icon-Star" />
                <i className="icon-Star" />
                <i className="icon-Star" />
                <i className="icon-Star" />
                <i className="icon-Star" />
              </div>
              <span className="rating-count">({data.rating})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseTypeFour
