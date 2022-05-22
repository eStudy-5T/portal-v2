import React, { useState, useContext, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { useParams, Link } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { slugify } from '../../utils'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import CourseInfo from '../../components/course/CourseInfo'
import MeetingLink from '../../components/meeting-link/MeetingLink'

// MUI component
import { Rating } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'

// Services
import courseService from '../../services/course-service'

import CourseData from '../../data/course/CourseData.json'
import InstructorData from '../../data/instructor/InstructorData.json'

// i18
import { useTranslation } from 'react-i18next'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

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

function ClassesTabContent(data) {
  const [classesData, setClassesData] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  const { t: translation } = useTranslation()

  const [activeId, setActiveId] = useState('0')

  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null)
    } else {
      setActiveId(id)
    }
  }

  useEffect(() => {
    setIsMounted(true)
    const courseId = data.courseId
    courseService.getClasses(courseId).then(({ data: ClassesData }) => {
      if (isMounted) {
        setClassesData(ClassesData)
      }
    })
  }, [data.courseId, isMounted])

  return (
    <Accordion bsPrefix="edu-accordion-02" defaultActiveKey={activeId} flush>
      {classesData?.map((accordion, i) => (
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
              Lớp học {i + 1}
              {/* {accordion.title} */}
            </CustomToggle>
          </div>
          <Accordion.Body bsPrefix="edu-accordion-body">
            <ul>
              <li>
                <div className="text">
                  <i className="icon-time-line" />
                  {translation('classDetails.duration')}
                </div>
                <div className="icon">
                  {accordion.duration} {translation('classDetails.hours')}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-user-2" />
                  {translation('classDetails.enrolled')}/
                  {translation('classDetails.maxSlot')}
                </div>
                <div className="icon">
                  {accordion.maxSlots - accordion.remainingSlots}/
                  {accordion.maxSlots}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-calendar-2-line" />
                  {translation('classDetails.startDate')}
                </div>
                <div className="icon">{formatDate(accordion.startDate)}</div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-calendar-2-line" />
                  {translation('classDetails.endDate')}
                </div>
                <div className="icon">{formatDate(accordion.endDate)}</div>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
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
              <li>
                <div className="text">
                  <i className="icon-draft-line" />
                  {translation('courseDetails.nationalities') +
                    ': ' +
                    (student.user.nationality || '')}
                </div>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

function ReviewsTabContent(data) {
  const [courseReviews, setCourseReviews] = useState([])
  const [isMounted, setIsMounted] = useState(false)
  const [oneStarRateCount, setOneStarRateCount] = useState(0)
  const [twoStarRateCount, setTwoStarRateCount] = useState(0)
  const [threeStarRateCount, setThreeStarRateCount] = useState(0)
  const [fourStarRateCount, setFourStarRateCount] = useState(0)
  const [fiveStarRateCount, setFiveStarRateCount] = useState(0)

  const { t: translation } = useTranslation()

  useEffect(() => {
    setIsMounted(true)
    console.log('Reviews tab')
    console.log(data.courseId)
    courseService
      .getCourseReviews(data.courseId)
      .then(({ data: CourseReviewsData }) => {
        if (isMounted) {
          setCourseReviews(CourseReviewsData.data)
          CourseReviewsData.data.map((review) => {
            console.log('this is ', review.rate)
            if (review.rate === 1) {
              setOneStarRateCount(oneStarRateCount + 1)
            }
            if (review.rate === 2) {
              setTwoStarRateCount(twoStarRateCount + 1)
            }
            if (review.rate === 3) {
              setThreeStarRateCount(threeStarRateCount + 1)
            }
            if (review.rate === 4) {
              setFourStarRateCount(fourStarRateCount + 1)
            }
            if (review.rate === 5) {
              setFiveStarRateCount(fiveStarRateCount + 1)
            }

            return
          })
        }
      })
  }, [data.courseId, isMounted])

  const totalRateCount =
    oneStarRateCount +
    twoStarRateCount +
    threeStarRateCount +
    fourStarRateCount +
    fiveStarRateCount
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
              <div className="rating-number">{averageRating}</div>
              <div className="rating letmeet-course-rating-stars">
                <Rating
                  readOnly
                  value={averageRating}
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
              {/* <span>({courseItem.review} Review)</span> */}
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

        <div className="comment-wrapper pt--40">
          {courseReviews.map((review) => (
            <div className="edu-comment" key={review.id}>
              <div className="thumbnail">
                <img
                  src="https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-1/280625274_2933762000177853_5642260365791263882_n.jpg?stp=c0.7.200.200a_dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=pjSE69EKyoQAX8mHZch&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT8rGvTZWquCsovt1ER485aOju98us07LtyU7tISXcThBw&oe=628D6001g"
                  alt="Student Thumb"
                />
              </div>
              <div className="comment-content">
                <div className="comment-top">
                  <h6 className="title">{review.username}</h6>
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
          ))}
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

  const { id } = useParams()
  const courseId = 1
  const userId = localStorage.getItem('currentUser')
  const data = CourseData.filter((course) => course.id === courseId)
  const courseItem = data[0]

  const fakeId = 'e1fbda3d-59d0-48b1-ba40-c5213396d1ce'

  useEffect(() => {
    setIsMounted(true)
    async function fetchData() {
      const { data } = await courseService.getSpecificCourse(id)
      const { ownerId } = data
      setCourseData({ ...data })
      setOwnerId(ownerId)
    }
    if (isMounted) {
      fetchData()
    }
  }, [id, isMounted])

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
      <SEO title={courseItem.title} />
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
                        ({courseItem.review} {translation("courseDetails.review")})
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
                    <li className="nav-item">
                      <button
                        className={
                          contentTab === 'sessions'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        type="button"
                        aria-label="Sessions"
                        onClick={() => handleTab('sessions')}
                      >
                        {translation('courseDetails.sessions')}
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

                    {contentTab === 'sessions' && (
                      <ScrollAnimation
                        animateIn="fadeIn"
                        animateOut="fadeInOut"
                        className={`tab-pane fade show ${
                          contentTab === 'sessions' ? 'active' : ''
                        } `}
                        animateOnce
                      >
                        <div className="course-tab-content">
                          <ClassesTabContent courseId={fakeId} />
                        </div>
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
                      <ReviewsTabContent courseId={id} />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                <CourseInfo courseData={courseData} />
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
