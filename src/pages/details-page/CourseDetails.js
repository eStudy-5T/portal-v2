import React, { useState, useContext, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { useParams, Link } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { slugify } from '../../utils'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import CourseInfo from '../../components/course/CourseInfo'
import RelatedCourses from '../../components/course/RelatedCourses'

// MUI component
import { Rating } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'

// Services
import courseService from '../../services/course-service'
import userService from '../../services/user-service'

import CourseData from '../../data/course/CourseData.json'
import InstructorData from '../../data/instructor/InstructorData.json'
import CurriculumTabContent from '../../data/course/CurriculumTabContent.json'

// i18
import { useTranslation } from 'react-i18next'

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

function ClassesTabContent() {
  const { t: translation } = useTranslation()

  const [activeId, setActiveId] = useState('0')

  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null)
    } else {
      setActiveId(id)
    }
  }

  return (
    <Accordion bsPrefix="edu-accordion-02" defaultActiveKey={activeId} flush>
      {CurriculumTabContent.map((accordion, i) => (
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
              {accordion.title}
            </CustomToggle>
          </div>
          <Accordion.Body bsPrefix="edu-accordion-body">
            <ul>
              <li>
                <div className="text">
                <i className="icon-time-line" />
                  {translation("courseDetails.classDetails.duration")}
                </div>
                <div className="icon">
                  {accordion.duration}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-user-2" />
                  {translation("courseDetails.classDetails.enrolled")}/{translation("courseDetails.classDetails.maxSlot")}
                </div>
                <div className="icon">
                  {accordion.enrolled}/{accordion.maxSlot}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-bar-chart-2-line" />
                  {translation("courseDetails.classDetails.grade")}
                </div>
                <div className="icon">
                  {accordion.grade}
                </div>
              </li>
              <li>
                <div className="text">
                  <i className="icon-user-2-line_tie" />
                  {translation("courseDetails.classDetails.fee")}
                </div>
                <div className="icon">
                  {accordion.fee} VND
                </div>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

function CourseDetails() {
  const { t: translation } = useTranslation()
  
  const [courseData, setCourseData] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  const { id } = useParams()
  const courseId = 1
  const data = CourseData.filter((course) => course.id === courseId)
  const courseItem = data[0]

  useEffect(() => {
    setIsMounted(true)
    courseService.getSpecificCourse(id).then(({ data: CourseDetailsData }) => {
      if (isMounted) {
        userService
          .fetchUserInfo(CourseDetailsData.ownerId)
          .then(({ data: teacherInfo }) => {
            setCourseData({ ...CourseDetailsData, teacherInfo })
          })
      }
    })
  }, [id, isMounted])

  console.log(courseData)

  const indexOfInstructor = InstructorData.findIndex(
    (instructor) => slugify(instructor.name) === slugify(courseItem.instructor)
  )
  const instructor = InstructorData[indexOfInstructor]
  const instructorExcerpt = `${instructor.details.substring(0, 190)}...`

  const teacherInfo = courseData ? courseData.teacherInfo : null
  const teacherFullName = teacherInfo ? teacherInfo.firstName + ' ' + teacherInfo.lastName : null

  const [contentTab, setContentTab] = useState('overview')
  const handleTab = (content) => {
    if (content === 'overview') {
      setContentTab('overview')
    } else if (content === 'curriculum') {
      setContentTab('curriculum')
    } else if (content === 'instructor') {
      setContentTab('instructor')
    } else if (content === 'reviews') {
      setContentTab('reviews')
    }
  }

  return (
    <>
      <SEO title={courseItem.title} />
      <Layout>
        <BreadcrumbOne
          title={translation("pageTitle.courseDetails")}
          rootUrl="/"
          parentUrl={translation("pageTitle.home")}
          currentUrl={translation("pageTitle.courseDetails")}
        />
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
                    <div className="author-meta">
                      <div className="author-thumb">
                        <Link
                          to={`${
                            process.env.PUBLIC_URL
                          }/instructor-details/${slugify(
                            courseItem.instructor
                          )}`}
                        >
                          <img
                            src={`${teacherInfo ? teacherInfo.avatar : instructor.image}`}
                            alt="Author Thumb"
                          />
                          <span className="author-title">
                            By{' '}{teacherFullName}
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
                        ({courseItem.review} Review)
                      </span>
                    </div>
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
                        {translation("courseDetails.overview")}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={
                          contentTab === 'curriculum'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                        type="button"
                        aria-label="Curriculum"
                        onClick={() => handleTab('curriculum')}
                      >
                        {translation("courseDetails.classes")}
                      </button>
                    </li>
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
                        {translation("courseDetails.instructors")}
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
                        {translation("courseDetails.reviews")}
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
                            __html: `<h5>${translation("courseDetails.description")}</h5>`.concat(
                              courseData
                                ? `<p>${courseData.description}</p>`
                                : null,
                              `<h5>${translation("courseDetails.whatWillYouLearn")}</h5>`,
                            )
                          }}
                        />
                      </ScrollAnimation>
                    )}

                    {contentTab === 'curriculum' && (
                      <ScrollAnimation
                        animateIn="fadeIn"
                        animateOut="fadeInOut"
                        className={`tab-pane fade show ${
                          contentTab === 'curriculum' ? 'active' : ''
                        } `}
                        animateOnce
                      >
                        <div className="course-tab-content">
                          <ClassesTabContent />
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
                                  src={`${teacherInfo && teacherInfo.avatar}`}
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
                                    courseItem.instructor
                                  )}`}
                                >
                                  {teacherFullName}
                                </Link>
                              </h6>
                              <span className="subtitle">
                                {instructor.designation}
                              </span>
                              <p>{teacherInfo && teacherInfo.description}</p>
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
                      <ScrollAnimation
                        animateIn="fadeIn"
                        animateOut="fadeInOut"
                        className={`tab-pane fade show ${
                          contentTab === 'reviews' ? 'active' : ''
                        } `}
                        animateOnce
                      >
                        <div className="course-tab-content">
                          <div className="row row--30">
                            <div className="col-lg-4">
                              <div className="rating-box">
                                <div className="rating-number">
                                  {courseItem.rating}
                                </div>
                                <div className="rating letmeet-course-rating-stars">
                                  <i className="icon-Star" />
                                  <i className="icon-Star" />
                                  <i className="icon-Star" />
                                  <i className="icon-Star" />
                                  <i className="icon-Star" />
                                </div>
                                <span>({courseItem.review} Review)</span>
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
                                      style={{ width: '100%' }}
                                      aria-valuenow="100"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    />
                                  </div>
                                  <span className="rating-value">1</span>
                                </div>

                                <div className="single-progress-bar">
                                  <div className="rating-text">
                                    4 <i className="icon-Star" />
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: '0%' }}
                                      aria-valuenow="0"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    />
                                  </div>
                                  <span className="rating-value">0</span>
                                </div>

                                <div className="single-progress-bar">
                                  <div className="rating-text">
                                    3 <i className="icon-Star" />
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: '0%' }}
                                      aria-valuenow="0"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    />
                                  </div>
                                  <span className="rating-value">0</span>
                                </div>

                                <div className="single-progress-bar">
                                  <div className="rating-text">
                                    2 <i className="icon-Star" />
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: '0%' }}
                                      aria-valuenow="0"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    />
                                  </div>
                                  <span className="rating-value">0</span>
                                </div>

                                <div className="single-progress-bar">
                                  <div className="rating-text">
                                    1 <i className="icon-Star" />
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: '0%' }}
                                      aria-valuenow="0"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    />
                                  </div>
                                  <span className="rating-value">0</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="comment-wrapper pt--40">
                            <div className="section-title">
                              <h5 className="mb--25">Reviews</h5>
                            </div>
                            <div className="edu-comment">
                              <div className="thumbnail">
                                <img
                                  src="/images/course/student-review/student-1.png"
                                  alt="Student Thumb"
                                />
                              </div>
                              <div className="comment-content">
                                <div className="comment-top">
                                  <h6 className="title">Elen Saspita</h6>
                                  <div className="rating letmeet-course-rating-stars">
                                    <i className="icon-Star" />
                                    <i className="icon-Star" />
                                    <i className="icon-Star" />
                                    <i className="icon-Star" />
                                    <i className="icon-Star" />
                                  </div>
                                </div>
                                <span className="subtitle">
                                  “ Outstanding Course ”
                                </span>
                                <p>
                                  As Thomas pointed out, Chegg’s survey appears
                                  more like a scorecard that details obstacles
                                  and challenges that the current university
                                  undergraduate student population is going
                                  through in their universities and countries.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollAnimation>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                <CourseInfo data={courseItem} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <RelatedCourses courseID={courseItem.id} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default CourseDetails
