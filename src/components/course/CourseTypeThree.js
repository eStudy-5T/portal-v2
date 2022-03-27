import React from 'react'
import { Link } from 'react-router-dom'

function CourseTypeThree({ data, classes, bgWhite }) {
  return (
    <div
      className={`edu-card card-type-1 radius-small ${classes || ''} ${
        bgWhite === 'enable' ? 'bg-white' : ''
      }`}
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
          <div className="top-position status-group left-top">
            <span className="letmeet-status status-01">{data.level}</span>
          </div>
          <div className="wishlist-top-right">
            <button className="wishlist-btn">
              <i className="icon-Heart" />
            </button>
          </div>
        </div>
        <div className="content">
          <ul className="edu-meta meta-01">
            <li>
              <i className="icon-file-list-4-line" />
              {data.lesson} Lessons
            </li>
            <li>
              <i className="icon-time-line" />
              {data.duration}
            </li>
          </ul>
          <h6 className="title">
            <Link to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}>
              {data.title}
            </Link>
          </h6>
          <div className="edu-rating rating-default">
            <div className="rating letmeet-course-rating-stars">
              <i className="icon-Star" />
              <i className="icon-Star" />
              <i className="icon-Star" />
              <i className="icon-Star" />
              <i className="icon-Star" />
            </div>
            <span className="rating-count">({data.review} Review)</span>
          </div>
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
            <ul className="edu-meta meta-01">
              <li>
                <i className="icon-account-circle-line" />
                {data.student} Students
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseTypeThree
