import React, { useState, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ScrollAnimation from 'react-animate-on-scroll'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { slugify } from '../../utils'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import CourseInfo from '../../components/course/CourseInfo'
import MeetingLink from '../../components/meeting-link/MeetingLink'

// Images
import CloneAvatar from '../../assets/images/clone.png'

//Form
import ReviewForm from '../../components/form/ReviewForm'

// MUI component
import { Rating } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'

// Services
import courseService from '../../services/course-service'

import CourseData from '../../data/course/CourseData.json'
import InstructorData from '../../data/instructor/InstructorData.json'

// i18
import { useTranslation } from 'react-i18next'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import userService from '../../services/user-service'

function CustomToggle({ children, eventKey }) {
  const { activeEventKey } = useContext(AccordionContext)
  const decoratedOnClick = useAccordionButton(eventKey)
  const isCurrentEventKey = activeEventKey === eventKey
  return (
    <button
      type="button"
      onClick={decoratedOnClick}
      aria-expanded={!!isCurrentEventKey}
      className="edu-accordion-button"
    >
      {children}
    </button>
  )
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('/')
}

const EnrolledTabContent = (props) => {
  const [activeId, setActiveId] = useState(null)
  const [studentsData, setStudentsData] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  const { t: translation } = useTranslation()

  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null)
    } else {
      setActiveId(id)
    }
  }

  useEffect(() => {
    setIsMounted(true)
    const courseId = props.courseId

    courseService
      .getEnrolledStudents(courseId)
      .then(({ data: StudentsData }) => {
        if (isMounted) {
          setStudentsData(StudentsData)
        }
      })
  }, [props, isMounted])

  return (
    <Accordion bsPrefix="edu-accordion-02" defaultActiveKey={activeId} flush>
      {studentsData.map((student, i) => (
        <Accordion.Item
          eventKey={i.toString()}
          key={i}
          onClick={() => toggleActive(i.toString())}
          bsPrefix={`edu-accordion-item ${
            activeId === i.toString() ? 'bg-active' : ''
          }`}
        >
          <div className="edu-accordion-header">
            <CustomToggle eventKey={i.toString()}>
              {student.user.firstName + ' ' + student.user.lastName}
            </CustomToggle>
          </div>
          <Accordion.Body bsPrefix="edu-accordion-body">
            <ul>
              <li>
                <div className="text">
                  <i className="icon-draft-line" />
                  {translation('courseDetails.fullName') +
                    ': ' +
                    (student.user.firstName + ' ' + student.user.lastName) ||
                    ''}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-draft-line" />
                  {translation('courseDetails.dateOfBirth') +
                    ': ' +
                    ((student.user.dateOfBirth &&
                      formatDate(student.user.dateOfBirth)) ||
                      '')}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-draft-line" />
                  {translation('courseDetails.email') +
                    ': ' +
                    (student.user.email || '')}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-draft-line" />
                  {translation('courseDetails.phoneNumber') +
                    ': ' +
                    (student.user.mobilePhone || '')}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-draft-line" />
                  {translation('courseDetails.enrolledDate') +
                    ': ' +
                    (formatDate(student.createdAt) || '')}
                </div>
              </li>
              {/* <li>
                <div className="text">
                  <i className="icon-draft-line" />
                  {translation('courseDetails.nationalities') +
                    ': ' +
                    (student.user.nationality || '')}
                </div>
              </li> */}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

function ReviewsTabContent(data) {
  const userInfo = useSelector((state) => state.userInfo)
  const currentUserId = data.currentUserId
  const [courseReviews, setCourseReviews] = useState([])
  const [isMounted, setIsMounted] = useState(false)
  const [oneStarRateCount, setOneStarRateCount] = useState(0)
  const [twoStarRateCount, setTwoStarRateCount] = useState(0)
  const [threeStarRateCount, setThreeStarRateCount] = useState(0)
  const [fourStarRateCount, setFourStarRateCount] = useState(0)
  const [fiveStarRateCount, setFiveStarRateCount] = useState(0)
  const [totalRateCount, setTotalRateCount] = useState(0)
  const [isReviewable, setIsReviewable] = useState(false)
  const [avatars, setAvatars] = useState([])

  const { t: translation } = useTranslation()

  useEffect(() => {
    setIsMounted(true)
    courseService
      .getCourseReviews(data.courseId)
      .then(({ data: CourseReviewsData }) => {
        if (isMounted) {
          let countOneStar = 0,
            countTwoStar = 0,
            countThreeStar = 0,
            countFourStar = 0,
            countFiveStar = 0
          setTotalRateCount(CourseReviewsData.count)
          setCourseReviews(CourseReviewsData.data)
          CourseReviewsData.data.forEach((review) => {
            switch (review.rate) {
              default:
                break
              case 1: {
                countOneStar = countOneStar + 1
                break
              }
              case 2: {
                countTwoStar = countTwoStar + 1
                break
              }
              case 3: {
                countThreeStar = countThreeStar + 1
                break
              }
              case 4: {
                countFourStar = countFourStar + 1
                break
              }
              case 5: {
                countFiveStar = countFiveStar + 1
                break
              }
            }
            userService
              .fetchUserInfo(review.userId)
              .then((user) => {
                setAvatars((previousState) => {
                  const newState = [...previousState, user.data.avatar]
                  return newState
                })
              })
              .catch()
          })
          setOneStarRateCount(countOneStar)
          setTwoStarRateCount(countTwoStar)
          setThreeStarRateCount(countThreeStar)
          setFourStarRateCount(countFourStar)
          setFiveStarRateCount(countFiveStar)
        }
      })
    currentUserId &&
      courseService
        .getEnrolledStudents(data.courseId)
        .then(({ data: StudentsData }) => {
          if (isMounted) {
            StudentsData.map((student) => {
              if (student.user.id === currentUserId)
                setIsReviewable(data.isActive)
              return null
            })
          }
        })
  }, [data, isMounted, currentUserId])

  const totalRateStar =
    oneStarRateCount +
    twoStarRateCount * 2 +
    threeStarRateCount * 3 +
    fourStarRateCount * 4 +
    fiveStarRateCount * 5
  const averageRating = totalRateStar / totalRateCount

  return (
    <ScrollAnimation
      animateIn="fadeIn"
      animateOut="fadeInOut"
      className={`tab-pane fade show active`}
      animateOnce
    >
      <div className="course-tab-content">
        <div className="row row--30">
          <div className="col-lg-4">
            <div className="rating-box">
              <div className="rating-number">{averageRating || 0}</div>
              <div className="rating letmeet-course-rating-stars">
                <Rating
                  readOnly
                  value={averageRating || 0}
                  precision={0.5}
                  icon={<Star sx={{ color: '#ffa41b' }}></Star>}
                  emptyIcon={
                    <StarBorder sx={{ color: '#ffa41b' }}></StarBorder>
                  }
                ></Rating>
              </div>
              <span>
                {totalRateCount + ' ' + translation('courseDetails.reviews')}
              </span>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="review-wrapper">
              <div className="single-progress-bar">
                <div className="rating-text">
                  5 <i className="icon-Star" />
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: (fiveStarRateCount * 100) / totalRateCount + '%'
                    }}
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="rating-value">{fiveStarRateCount}</span>
              </div>

              <div className="single-progress-bar">
                <div className="rating-text">
                  4 <i className="icon-Star" />
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: (fourStarRateCount * 100) / totalRateCount + '%'
                    }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="rating-value">{fourStarRateCount}</span>
              </div>

              <div className="single-progress-bar">
                <div className="rating-text">
                  3 <i className="icon-Star" />
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: (threeStarRateCount * 100) / totalRateCount + '%'
                    }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="rating-value">{threeStarRateCount}</span>
              </div>

              <div className="single-progress-bar">
                <div className="rating-text">
                  2 <i className="icon-Star" />
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: (twoStarRateCount * 100) / totalRateCount + '%'
                    }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="rating-value">{twoStarRateCount}</span>
              </div>

              <div className="single-progress-bar">
                <div className="rating-text">
                  1 <i className="icon-Star" />
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: (oneStarRateCount * 100) / totalRateCount + '%'
                    }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="rating-value">{oneStarRateCount}</span>
              </div>
            </div>
          </div>
        </div>

        {isReviewable && (
          <ReviewForm
            avatar={`${userInfo.avatar || CloneAvatar}`}
            firstName={userInfo.firstName || 'Guest'}
            lastName={userInfo.lastName || 'User'}
            courseId={data.courseId}
          ></ReviewForm>
        )}

        <div className="comment-wrapper pt--40">
          {courseReviews.length > 0 && (
            <div className="section-title">
              <h5 className="mb--25">{translation('courseDetails.reviews')}</h5>
            </div>
          )}
          {courseReviews.map((review, index) => {
            return (
              <div className="edu-comment" key={review.id}>
                <div className="thumbnail">
                  <img
                    src={avatars[index] || CloneAvatar}
                    alt="Student Thumb"
                  />
                </div>
                <div className="comment-content">
                  <div className="comment-top">
                    <h6 className="title mb--0">{review.username}</h6>
                    <div className="rating letmeet-course-rating-stars">
                      <i
                        className={
                          review.rate >= 1 ? 'icon-Star' : 'off icon-Star'
                        }
                      />
                      <i
                        className={
                          review.rate >= 2 ? 'icon-Star' : 'off icon-Star'
                        }
                      />
                      <i
                        className={
                          review.rate >= 3 ? 'icon-Star' : 'off icon-Star'
                        }
                      />
                      <i
                        className={
                          review.rate >= 4 ? 'icon-Star' : 'off icon-Star'
                        }
                      />
                      <i
                        className={
                          review.rate >= 5 ? 'icon-Star' : 'off icon-Star'
                        }
                      />
                    </div>
                  </div>
                  <span className="subtitle">{review.title}</span>
                  <p>{review.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ScrollAnimation>
  )
}

function CourseDetails() {
  const { t: translation } = useTranslation()

  const [courseData, setCourseData] = useState(null)
  const [ownerId, setOwnerId] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const { id } = useParams()
  const courseId = 1
  const userId = localStorage.getItem('currentUserId')
  const data = CourseData.filter((course) => course.id === courseId)
  const courseItem = data[0]

  useEffect(() => {
    setIsMounted(true)

    searchParams.forEach((value, key) => {
      searchParams.delete(key)
    })
    setSearchParams(searchParams)

    async function fetchData() {
      const { data } = await courseService.getSpecificCourse(id)
      const { ownerId } = data
      setCourseData({ ...data })
      setOwnerId(ownerId)
    }
    if (isMounted) {
      fetchData()
    }
  }, [id, isMounted, searchParams, setSearchParams])

  const indexOfInstructor = InstructorData.findIndex(
    (instructor) => slugify(instructor.name) === slugify(courseItem.instructor)
  )
  const instructor = InstructorData[indexOfInstructor]
  const instructorExcerpt = `${
    !isEmpty(get(courseData, 'owner.description'))
      ? get(courseData, 'owner.description')
      : instructor.details.substring(0, 190)
  }...`

  const teacherInfo = get(courseData, 'owner', instructor)
  const teacherFullName = teacherInfo
    ? teacherInfo.firstName + ' ' + teacherInfo.lastName
    : null

  const [contentTab, setContentTab] = useState('overview')
  const handleTab = (content) => {
    if (content === 'overview') {
      setContentTab('overview')
    } else if (content === 'sessions') {
      setContentTab('sessions')
    } else if (content === 'enrolled') {
      setContentTab('enrolled')
    } else if (content === 'instructor') {
      setContentTab('instructor')
    } else if (content === 'reviews') {
      setContentTab('reviews')
    }
  }

  return (
    <>
      <MeetingLink shouldShow={false} />
      <SEO title={courseData && courseData.title} />
      <Layout>
        <div className="edu-course-details-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <div className="main-image thumbnail">
                  <img
                    className="radius-small"
                    src={`${courseItem.imageDetails}`}
                    alt="Course Thumb"
                  />
                </div>
              </div>
            </div>

            <div className="row g-5">
              <div className="col-xl-8 col-lg-7">
                <div className="course-details-content">
                  <div className="content-top">
                    {/* <div className="author-meta">
                      <div className="author-thumb">
                        <Link
                          to={`${
                            process.env.PUBLIC_URL
                          }/instructor-details/${slugify(
                            courseItem.instructor
                          )}`}
                        >
                          <img
                            src={`${teacherInfo.avatar ? teacherInfo.avatar : '/images/course/student-review/student-1.png'}`}
                            alt="Author Thumb"
                          />
                          <span className="author-title">
                            {' '}{teacherFullName}
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="edu-rating rating-default letmeet-course-rating-stars">
                      <div className="rating letmeet-course-rating-stars">
                        {courseData && (
                          <Rating
                            readOnly
                            value={courseData.rating}
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
                        )}
                      </div>
                      <span className="rating-count">
                        ({courseItem.review} {translation("courseDetails.reviews")})
                      </span>
                    </div> */}
                  </div>

                  <h3 className="title">
                    {courseData ? courseData.title : null}
                  </h3>
                  <ul className="edu-course-tab nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <button
                        className={
                          contentTab === 'overview'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        type="button"
                        aria-label="Overview"
                        onClick={() => handleTab('overview')}
                      >
                        {translation('courseDetails.overview')}
                      </button>
                    </li>
                    {userId === ownerId ? (
                      <li className="nav-item">
                        <button
                          className={
                            contentTab === 'enrolled'
                              ? 'nav-link active'
                              : 'nav-link'
                          }
                          type="button"
                          aria-label="Enrolled"
                          onClick={() => handleTab('enrolled')}
                        >
                          {translation('courseDetails.enrolled')}
                        </button>
                      </li>
                    ) : null}
                    <li className="nav-item">
                      <button
                        className={
                          contentTab === 'instructor'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        type="button"
                        aria-label="Instructor"
                        onClick={() => handleTab('instructor')}
                      >
                        {translation('courseDetails.instructors')}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={
                          contentTab === 'reviews'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        type="button"
                        aria-label="Reviews"
                        onClick={() => handleTab('reviews')}
                      >
                        {translation('courseDetails.reviews')}
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content">
                    {contentTab === 'overview' && (
                      <ScrollAnimation
                        animateIn="fadeIn"
                        animateOut="fadeInOut"
                        className={`tab-pane fade show ${
                          contentTab === 'overview' ? 'active' : ''
                        } `}
                        animateOnce
                      >
                        <div
                          className="course-tab-content"
                          dangerouslySetInnerHTML={{
                            __html: `<h5>${translation(
                              'courseDetails.description'
                            )}</h5>`.concat(
                              courseData
                                ? `<p>${courseData.description}</p>`
                                : null,
                              `<h5>${translation(
                                'courseDetails.whatWillYouLearn'
                              )}</h5>`
                            )
                          }}
                        />
                      </ScrollAnimation>
                    )}

                    {contentTab === 'enrolled' && (
                      <ScrollAnimation
                        animateIn="fadeIn"
                        animateOut="fadeInOut"
                        className={`tab-pane fade show ${
                          contentTab === 'enrolled' ? 'active' : ''
                        } `}
                        animateOnce
                      >
                        <div className="course-tab-content">
                          <EnrolledTabContent courseId={id} />
                        </div>
                      </ScrollAnimation>
                    )}

                    {contentTab === 'instructor' && (
                      <ScrollAnimation
                        animateIn="fadeIn"
                        animateOut="fadeInOut"
                        className={`tab-pane fade show ${
                          contentTab === 'instructor' ? 'active' : ''
                        } `}
                        animateOnce
                      >
                        <div className="course-tab-content">
                          <div className="course-author-wrapper">
                            <div className="thumbnail">
                              <Link
                                to={`${
                                  process.env.PUBLIC_URL
                                }/instructor-details/${slugify(
                                  courseItem.instructor
                                )}`}
                              >
                                <img
                                  src={`${
                                    teacherInfo && teacherInfo.avatar
                                      ? teacherInfo.avatar
                                      : '/images/instructor/instructor-02/instructor-1.jpg'
                                  }`}
                                  alt="Author Thumb"
                                />
                              </Link>
                            </div>
                            <div className="author-content">
                              <h6 className="title">
                                <Link
                                  to={`${
                                    process.env.PUBLIC_URL
                                  }/instructor-details/${slugify(
                                    courseData.ownerId || courseItem.instructor
                                  )}`}
                                >
                                  {teacherFullName}
                                </Link>
                              </h6>
                              <span className="subtitle">
                                {'Teacher' || instructor.designation}
                              </span>
                              <p>{instructorExcerpt}</p>
                              <ul className="social-share border-style">
                                <li>
                                  <a href={instructor.facebookUrl}>
                                    <i className="icon-Fb" />
                                  </a>
                                </li>
                                <li>
                                  <a href={instructor.linkedInUrl}>
                                    <i className="icon-linkedin" />
                                  </a>
                                </li>
                                <li>
                                  <a href={instructor.pinterest}>
                                    <i className="icon-Pinterest" />
                                  </a>
                                </li>
                                <li>
                                  <a href={instructor.twitterUrl}>
                                    <i className="icon-Twitter" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </ScrollAnimation>
                    )}

                    {contentTab === 'reviews' && (
                      <ReviewsTabContent
                        courseId={id}
                        ownerId={ownerId}
                        currentUserId={userId}
                        isActive={courseData.isActive}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                {courseData && (
                  <CourseInfo courseData={courseData} currentUserId={userId} />
                )}
              </div>
            </div>
            {/* <div className="row">
              <div className="col-lg-12">
                <RelatedCourses courseID={courseItem.id} />
              </div>
            </div> */}
          </div>
        </div>
      </Layout>
    </>
  )
}
export default CourseDetails
