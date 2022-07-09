import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { slugify } from '../../utils'
import InstructorData from '../../data/instructor/InstructorData.json'
import CourseData from '../../data/course/CourseData.json'
import get from 'lodash/get'
import { useTranslation } from 'react-i18next'
import { numberWithCommas } from '../../utils/helpers/number-helper'
import courseService from '../../services/course-service'
// MUI component
import { Rating } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'

import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import CloneAvatar from '../../assets/images/clone.png'
import { calculateTotalLessonInCourse } from '../../utils/helpers/date-helper'

const BlueOnGreenTooltip = withStyles({
  tooltip: {
    fontSize: 'inherit',
    color: 'var(--color-primary)',
    backgroundColor: 'var(--color-white)'
  }
})(Tooltip)

function CourseTypeOne({
  data,
  classes,
  isAdmin,
  onModifyAccessClick,
  setSelectedCourse,
  setSelectedAction
}) {
  const { t: translation } = useTranslation()
  const [isFavorite, setIsFavorite] = useState(data.isFavorite || false)

  const excerpt = `${
    data.description
      ? data.description.substring(0, 142)
      : CourseData[1].excerpt.substring(0, 142)
  }...`
  const trimTitle = `${
    data.title ? data.title.substring(0, 26) : 'Unknown title'
  }${data.title.length > 26 ? '...' : ''}`

  const isActive = get(data, 'isActive', false)

  const handleActivateClick = () => {
    onModifyAccessClick()
    setSelectedCourse(data.id)
    setSelectedAction('activate')
  }

  const handleDeactivateClick = () => {
    onModifyAccessClick()
    setSelectedCourse(data.id)
    setSelectedAction('deactivate')
  }

  const totalLessons = calculateTotalLessonInCourse(
    data.startDate,
    data.endDate,
    data.daysOfWeek,
    data.schedules,
    data.scheduleType
  )

  const handleAddToFavoriteClick = async () => {
    const toggle = await courseService.toggleFavorite(data.id)
    console.log(data)
    toggle.status === 200 && setIsFavorite(!isFavorite)
  }

  return (
    <div className={`edu-card card-type-3 radius-small ${classes || ''}`}>
      <div className="inner">
        <div className="thumbnail">
          <Link to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}>
            <img
              className="w-100"
              src={`${process.env.PUBLIC_URL}/images/course/course-01/course-01.jpg`}
              alt="Course Thumb"
            />
          </Link>
          <div className="wishlist-top-right">
            <button className="wishlist-btn">
              {(isFavorite && (
                <i
                  className="icon-Heart"
                  style={{ color: 'var(--color-secondary)' }}
                />
              )) || <i className="icon-Heart" />}
            </button>
          </div>
          <div className="top-position status-group left-bottom">
            <Link
              className="letmeet-status status-03"
              to={`${process.env.PUBLIC_URL}/course-category/1}`}
            >
              {translation(get(data, 'category.name', 'category.general'))}
            </Link>
          </div>
        </div>
        <div className="content">
          <div className="card-top">
            <div className="author-meta">
              <div className="author-thumb">
                <Link
                  to={`${process.env.PUBLIC_URL}/instructor-details/${data.ownerId}`}
                >
                  <img
                    src={`${data.owner.avatar || CloneAvatar}`}
                    alt="Author Thumb"
                  />
                  <span className="author-title">{`${
                    data.instructor
                      ? data.instructor
                      : data.owner.firstName + ' ' + data.owner.lastName
                  }`}</span>
                </Link>
              </div>
            </div>
            <ul className="edu-meta meta-02">
              <li>
                <i className="icon-file-list-3-line" />
                {totalLessons || 0} Lessons
              </li>
            </ul>
          </div>
          <h6 className="title">
            <Link to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}>
              {trimTitle}
            </Link>
          </h6>
          <div className="card-bottom">
            <div className="price-list price-style-02">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  {data.price && (
                    <div className="price current-price">
                      {Number(data.price) !== 0
                        ? `${numberWithCommas(data.price)} VND`
                        : 'Free'}
                    </div>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  {data.oldPrice && (
                    <div className="price old-price">
                      {numberWithCommas(data.oldPrice)}VND
                    </div>
                  )}
                </div>
                <div className="row align-items-center">
                  <div className="edu-rating rating-default">
                    <div className="rating letmeet-course-rating-stars">
                      <Rating
                        readOnly
                        value={data.rating}
                        precision={0.5}
                        size="medium"
                        sx={{ color: '#ffa41b' }}
                        emptyIcon={
                          <StarBorderIcon
                            fontSize="inherit"
                            sx={{ color: '#ffa41b' }}
                          ></StarBorderIcon>
                        }
                      ></Rating>
                    </div>
                    <span className="rating-count">({data.rating})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-hover-action">
        <div className="hover-content">
          <div className="content-top">
            <div className="top-status-bar">
              <Link
                className="letmeet-status status-03"
                to={`${process.env.PUBLIC_URL}/course-category/${slugify(
                  'data.categories.slice(0, 1)'
                )}`}
              >
                {translation(get(data, 'category.name', 'category.general'))}
              </Link>
            </div>
            <div className="top-wishlist-bar">
              <button
                className="wishlist-btn"
                onClick={handleAddToFavoriteClick}
              >
                {(isFavorite && (
                  <i
                    className="icon-Heart"
                    style={{ color: 'var(--color-secondary)' }}
                  />
                )) || <i className="icon-Heart" />}
              </button>
            </div>
          </div>

          <h6 className="title">
            <Link to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}>
              {trimTitle}
            </Link>
          </h6>

          <p className="description">{excerpt}</p>

          <div className="price-list price-style-02">
            {data.price === '0' ? (
              <div className="price current-price">Free</div>
            ) : (
              <div className="price current-price">
                {numberWithCommas(data.price)} VND
              </div>
            )}
            {data.oldPrice && (
              <div className="price old-price">
                {numberWithCommas(data.oldPrice)} VND
              </div>
            )}
          </div>

          <div className="hover-bottom-content">
            <div className="author-meta">
              <div className="author-thumb">
                <Link
                  to={`${process.env.PUBLIC_URL}/instructor-details/${data.ownerId}`}
                >
                  <img
                    src={`${data.owner.avatar || CloneAvatar}`}
                    alt="Author Thumb"
                  />
                  <span className="author-title">{`${
                    data.instructor
                      ? data.instructor
                      : data.owner.firstName + ' ' + data.owner.lastName
                  }`}</span>
                </Link>
              </div>
            </div>
            <ul className="edu-meta meta-02">
              <li>
                <i className="icon-file-list-3-line" />
                {totalLessons || 0} {translation('courseDetails.sessions')}
              </li>
            </ul>
          </div>
          <div className="read-more-btn">
            {isAdmin ? (
              <>
                <BlueOnGreenTooltip title="See Detail">
                  <Link
                    className="edu-btn btn-medium btn-white"
                    to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}
                  >
                    <div style={{ marginBottom: '20px' }}>
                      <i className="fa fa-arrow-right" />
                    </div>
                  </Link>
                </BlueOnGreenTooltip>
                <BlueOnGreenTooltip
                  title="Approve"
                  style={{ marginLeft: '5px' }}
                >
                  <Link className="edu-btn btn-medium btn-white" to="">
                    <div style={{ marginBottom: '20px' }}>
                      <i className="fa fa-check" />
                    </div>
                  </Link>
                </BlueOnGreenTooltip>
                {!isActive && (
                  <BlueOnGreenTooltip
                    title="Activate"
                    style={{ marginLeft: '5px' }}
                  >
                    <Link
                      className="edu-btn btn-medium btn-white"
                      to=""
                      onClick={handleActivateClick}
                    >
                      <div style={{ marginBottom: '20px' }}>
                        <i className="fa fa-lock" />
                      </div>
                    </Link>
                  </BlueOnGreenTooltip>
                )}
                {isActive && (
                  <BlueOnGreenTooltip
                    title="Deactivate"
                    style={{ marginLeft: '5px' }}
                  >
                    <Link
                      className="edu-btn btn-medium btn-white"
                      to=""
                      onClick={handleDeactivateClick}
                    >
                      <div style={{ marginBottom: '20px' }}>
                        <i className="fa fa-unlock" />
                      </div>
                    </Link>
                  </BlueOnGreenTooltip>
                )}
                <BlueOnGreenTooltip
                  title="Remove"
                  style={{ marginLeft: '5px' }}
                >
                  <Link className="edu-btn btn-medium btn-white" to="">
                    <div style={{ marginBottom: '20px' }}>
                      <i className="fa fa-close" />
                    </div>
                  </Link>
                </BlueOnGreenTooltip>
              </>
            ) : (
              <Link
                className="edu-btn btn-medium btn-white"
                to={`${process.env.PUBLIC_URL}/course-details/${data.id}`}
              >
                {translation('courseDetails.seeDetails')}
                <i className="icon-arrow-right-line-right" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CourseTypeOne
