import React from 'react'
import { Link } from 'react-router-dom'
import InstructorData from '../../data/instructor/InstructorData.json'
import CourseData from '../../data/course/CourseData.json'

// i18
import { useTranslation } from 'react-i18next'
import {
  calculateCourseTotalDuration,
  calculateTotalLessonInCourse
} from '../../utils/helpers/date-helper'

function CourseTypeTwo({data}) {
  const { t: translation } = useTranslation()

  const instructor = data.instructor
  const course = data.course
  const indexOfInstructor = 0
  const instructorThumb = InstructorData[indexOfInstructor].image
  const dummyCourseData = CourseData[0]
  const totalLessons = calculateTotalLessonInCourse(
    course.startDate,
    course.endDate,
    course.daysOfWeek,
    course.schedules,
    course.scheduleType
  )
  const totalDuration = calculateCourseTotalDuration(
    course.startDate,
    course.endDate,
    course.daysOfWeek,
    course.schedules,
    course.scheduleType,
    course.lessonNumberPerWeek,
    course.startTime,
    course.endTime
  )

  return (
    <div className={`edu-card card-type-2 radius-small`}>
      <div className="inner">
        <div className="thumbnail">
          <Link to={`${process.env.PUBLIC_URL}/course-details/${course?.id}`}>
            <img className="w-100" src={`${dummyCourseData.image}`} alt="Course Thumb" />
          </Link>
          <div className="top-position status-group left-top">
            <span className="letmeet-status status-02">
              <i className="icon-time-line" />{' '}
              {`${totalDuration || 0} hour(s)`}
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
                  <span className="author-title">
                    {instructor?.lastName + ' ' + instructor?.firstName}
                  </span>
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
              {course?.title}
            </Link>
          </h6>
          <ul className="edu-meta meta-01">
            {/* <li>
              <i className="icon-group-line" />
              {get(course, 'students', 0)} {translation('instructorDetails.students')}
            </li> */}
            <li>
              <i className="icon-file-list-4-line" />
              {totalLessons || 0}{' '}
              {translation('instructorDetails.lessons')}
            </li>
          </ul>
          <div className="card-bottom">
            <div className="price-list price-style-01">
              {course?.price === '0' ? (
                <div className="price current-price">0</div>
              ) : (
                <div className="price current-price">{course?.price} VND</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CourseTypeTwo
