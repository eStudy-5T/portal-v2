import React, { useEffect } from 'react'
import TrackVisibility from 'react-on-screen'
import CountUp from 'react-countup'
import Slider from 'react-slick'
import { useParams, Link } from 'react-router-dom'
import { InstructorCourseSliderParams } from '../../utils/configs/ui-config'
import Layout from '../../common/Layout'
import Skill from '../../components/progressbar/ProgressbarItem'
import CourseTypeTwo from '../../components/course/CourseTypeTwo'
import courseService from '../../services/course-service'
import SEO from '../../common/SEO'
import userService from '../../services/user-service'
import { useState } from 'react'

import InstructorData from '../../data/instructor/InstructorData.json'
// i18
import { useTranslation } from 'react-i18next'

function InstructorDetails() {
  const { t: translation } = useTranslation()
  const { id } = useParams()
  const data = InstructorData.filter(
    (instructor) => instructor.name === 'James Carlson'
  )
  const teamMember = data[0]

  const [courses, setCourses] = useState()
  const [isMounted, setIsMounted] = useState(false)
  const [instructor, setInstructor] = useState()

  useEffect(() => {
    setIsMounted(true)
    userService.fetchUserInfo(id).then(({ data: InstructorData }) => {
      if (isMounted) {
        setInstructor(InstructorData)
      }
    })

    courseService.getCreatedCourses(id).then(({ data: CoursesData }) => {
      if (isMounted) {
        setCourses(CoursesData)
      }
    })
  }, [id, isMounted])

  return (
    <>
      <SEO title={instructor?.lastName + ' ' + instructor?.firstName} />
      <Layout>
        <div className="edu-instructor-profile-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-4 pr--55">
                <div className="instructor-profile-left">
                  <div className="inner">
                    <div className="thumbnail">
                      <img
                        src={`${process.env.PUBLIC_URL}../images/instructor/instructor-01/${teamMember?.image}`}
                        alt="Team Member"
                      />
                    </div>
                    <div className="content">
                      <h5 className="title">
                        {instructor?.lastName + ' ' + instructor?.firstName}
                      </h5>
                      <span className="subtitle">
                        {instructor?.designation ||
                          translation('instructorDetails.subTitle')}
                      </span>
                      <div className="contact-with-info">
                        <p>
                          <span>Email:</span>{' '}
                          <a href={`mailto:${instructor?.email}`}>
                            {instructor?.email}
                          </a>
                        </p>
                        <p>
                          <span>{translation('instructorDetails.phone')}:</span>{' '}
                          <a href={`tel:${instructor?.phone}`}>
                            {instructor?.phone ||
                              translation('instructorDetails.noInfo')}
                          </a>
                        </p>
                      </div>
                      <ul className="social-share bg-transparent justify-content-center medium-size">
                        <li>
                          <a href={teamMember?.facebookUrl}>
                            <i className="icon-Fb" />
                          </a>
                        </li>
                        <li>
                          <a href={teamMember?.linkedInUrl}>
                            <i className="icon-linkedin" />
                          </a>
                        </li>
                        <li>
                          <a href={teamMember?.pinterest}>
                            <i className="icon-Pinterest" />
                          </a>
                        </li>
                        <li>
                          <a href={teamMember?.twitterUrl}>
                            <i className="icon-Twitter" />
                          </a>
                        </li>
                      </ul>
                      <div className="contact-btn">
                        <Link to="/contact-me" className="edu-btn">
                          {translation('instructorDetails.contactMe')}
                          <i className="icon-arrow-right-line-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="instructor-profile-right">
                  <div className="inner">
                    <div className="section-title text-start">
                      <span className="pre-title">
                        {translation('instructorDetails.about')}
                      </span>
                      <h3 className="title">
                        {translation('instructorDetails.greeting')}{' '}
                        {instructor?.lastName + ' ' + instructor?.firstName}
                      </h3>
                      <p className="description mt--40">
                        {instructor?.description}
                      </p>
                    </div>

                    {teamMember?.experience &&
                      teamMember?.experience.length > 0 && (
                        <div className="edu-skill-style mt--65">
                          <div className="section-title text-start mb--30">
                            <span className="pre-title">
                              {translation('instructorDetails.skillSet')}
                            </span>
                            <h3 className="title">
                              {translation('instructorDetails.skills')}
                            </h3>
                          </div>
                          <div className="rbt-progress-style-1 row g-5">
                            {teamMember?.experience.map((progress, i) => (
                              <div className="col-lg-6" key={i}>
                                <TrackVisibility
                                  once
                                  className="single-progress"
                                >
                                  <Skill progress={progress} />
                                </TrackVisibility>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="course-statistic-wrapper bg-color-primary ptb--50 mt--65 radius-small">
                      <div className="row align-items-center g-5">
                        <div className="col-lg-6 colmd-6 col-12 line-separator">
                          <div className="course-statistic text-center">
                            <div className="inner">
                              <TrackVisibility once>
                                {({ isVisible }) =>
                                  isVisible && (
                                    <span className="total">
                                      <CountUp
                                        end={courses?.length}
                                        duration={1}
                                        delay={0.1}
                                        start={0}
                                      />
                                    </span>
                                  )
                                }
                              </TrackVisibility>
                              <p>
                                {translation('instructorDetails.courseAuthor')}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 colmd-6 col-12 line-separator">
                          <div className="course-statistic text-center">
                            <div className="inner">
                              <TrackVisibility once>
                                {({ isVisible }) =>
                                  isVisible && (
                                    <span className="total">
                                      <CountUp
                                        end={instructor?.rating}
                                        duration={1}
                                        delay={0.1}
                                        start={0}
                                        decimals={1}
                                      />
                                    </span>
                                  )
                                }
                              </TrackVisibility>
                              <p>{translation('instructorDetails.rating')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {courses && courses.length > 0 && (
                      <div className="edu-course-wrapper pt--65">
                        <div className="section-title text-start mb--20">
                          <span className="pre-title">
                            {translation('instructorDetails.courses')}
                          </span>
                          <h3 className="title">
                            {translation('instructorDetails.coursesBy')} :{' '}
                            {instructor?.lastName + ' ' + instructor?.firstName}
                          </h3>
                        </div>

                        {courses.length > 1 ? (
                          <Slider
                            className="instructor-profile-courses course-activation course-activation-item-2 slick-gutter-15 edu-slick-button"
                            {...InstructorCourseSliderParams}
                          >
                            {courses.map((course) => {
                              return (
                                <div
                                  key={course.id}
                                  className="letmeet-course-two-single"
                                >
                                  <CourseTypeTwo
                                    data={{ instructor, course }}
                                  />
                                </div>
                              )
                            })}
                          </Slider>
                        ) : (
                          courses.map((course) => {
                            return (
                              <div
                                key={course.id}
                                className="letmeet-course-two-single"
                              >
                                <CourseTypeTwo data={{ instructor, course }} />
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default InstructorDetails
