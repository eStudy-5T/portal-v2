import React from 'react'
import { Link } from 'react-router-dom'
import InstructorData from '../../data/instructor/InstructorData.json'
import CourseData from '../../data/course/CourseData.json'

// i18
import { useTranslation } from 'react-i18next'

function CourseTwo(data) {
  const { t: translation } = useTranslation()

  const instructor = data.data.instructor
  const course = data.data.course
  const indexOfInstructor = 0
  const instructorThumb = InstructorData[indexOfInstructor].image
  data = CourseData[0]
  
  return (
    <div className={`edu-card card-type-2 radius-small`}>
      <div className="inner">
        <div className="thumbnail">
          <Link to={`${process.env.PUBLIC_URL}/course-details/${course?.id}`}>
            <img
              className="w-100"
              src={`${data.image}`}
              alt="Course Thumb"
            />
          </Link>
          <div className="top-position status-group left-top">
            <span className="letmeet-status status-02">
              <i className="icon-time-line" /> {data.durationInHour}
            </span>
          </div>
          <div className="wishlist-top-right">
            <button className="wishlist-btn">
              <i className="icon-Heart" />
            </button>
          </div>
        </div>
        <div className="content">
          <div className="card-top">
            <div className="author-meta">
              <div className="author-thumb">
                <Link
                  to={`${process.env.PUBLIC_URL}/instructor-details/${instructor?.userId}`}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/instructor/instructor-small/${instructorThumb}`}
                    alt="Author Thumb"
                  />
                  <span className="author-title">{instructor?.lastName + " " + instructor?.firstName}</span>
                </Link>
              </div>
            </div>
            <div className="edu-rating rating-default">
              <div className="rating letmeet-course-rating-stars">
                <i className="icon-Star" />
              </div>
              <span className="rating-count">({course?.rating})</span>
            </div>
          </div>
          <h6 className="title">
            <Link to={`${process.env.PUBLIC_URL}/course-details/${course?.id}`}>
              {course.title}
            </Link>
          </h6>
          <ul className="edu-meta meta-01">
            <li>
              <i className="icon-group-line" />
              {data.student} {translation('instructorDetails.students')}
            </li>
            <li>
              <i className="icon-file-list-4-line" />
              {data.lesson} {translation('instructorDetails.lessons')}
            </li>
          </ul>
          <div className="card-bottom">
            <div className="price-list price-style-01">
              {data.price === '0' ? (
                <div className="price current-price">0</div>
              ) : (
                <div className="price current-price">{course?.price} VND</div>
              )}
              {data.oldPrice && (
                <div className="price old-price">{course?.oldPrice} VND</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CourseTwo
