/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import FsLightbox from 'fslightbox-react'
import EnrollConfirmDialog from '../../components/enroll-confirm-dialog/EnrollConfirmDialog'
import { format } from 'date-fns'

// i18
import { useTranslation } from 'react-i18next'

import get from 'lodash/get'
import courseService from '../../services/course-service'
import { useNavigate } from 'react-router-dom'
import { calculateCourseTotalDuration } from '../../utils/helpers/date-helper'
import { numberWithCommas } from '../../utils/helpers/number-helper'

const data = {
  id: 1,
  title: 'Competitive Strategy law for all students',
  image:
    'https://eduvibe.react.devsvibe.com/images/course/course-01/course-01.jpg',
  imageDetails:
    'https://eduvibe.react.devsvibe.com/images/course/course-details/course-01.jpg',
  instructor: 'James Carlson',
  duration: '3h 14m 20s',
  durationInHour: '3 Hours',
  durationInHourMinute: '3hr 14min',
  level: 'Intermediate',
  language: 'English',
  deadline: '25 Dec, 2022',
  rating: '4.9',
  student: 763,
  lesson: 29,
  quizzes: 12,
  price: '45.00',
  oldPrice: '55.00',
  review: 56,
  passPercentage: 80,
  featured: true,
  certificate: 'available',
  filterParam: 'Popularity',
  categories: ['Language Learning', 'Business'],
  videoLink: ['https://www.youtube.com/watch?v=pNje3bWz7V8'],
  link: 'https://meet.google.com/ppi-nrzj-wgu',
  excerpt:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  details:
    '<h5>Course Description</h5> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p><h5>What You’ll Learn From This Course</h5> <ul> <li>Neque sodales ut etiam sit amet nisl purus non tellus orci ac auctor</li><li>Tristique nulla aliquet enim tortor at auctor urna. Sit amet aliquam id diam maer</li><li>Nam libero justo laoreet sit amet. Lacus sed viverra tellus in hac</li><li>Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis</li></ul> <h5>Certification</h5> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>'
}

function CourseInfo({ courseData, currentUserId }) {
  const { t: translation } = useTranslation()
  const navigate = useNavigate()

  const [isShown, setIsShown] = useState(false)

  const [toggler, setToggler] = useState(false)

  const [isEnrolled, setIsEnrolled] = useState(false)

  const [isEnrollVisible, setEnrollVisible] = useState(false)

  const [isCourseDisabled, setCourseDisabled] = useState(false)

  const gradeDisplay = (grade) => {
    switch (grade) {
      default: return grade
      case 13: return translation('grades.university')
      case 14: return translation('grades.complementary')
    }    
  }

  const enrollCourse = () => {
    if (currentUserId !== null) setIsShown(true)
    else navigate('/login')
  }

  const closeEnrollConfirmDialog = () => {
    setIsShown(false)
  }

  useEffect(() => {
    setIsEnrolled(get(courseData, 'isEnrolled', false))
    setEnrollVisible(
      !(
        get(courseData, 'isCreator', false) ||
        get(courseData, 'isEnrolled', false)
      )
    )
    setCourseDisabled(!get(courseData, 'isActive', false))
  }, [courseData, isEnrolled])

  const confirmEnrollCourse = () => {
    const courseId = courseData.id

    if (courseData?.price) {
      courseService
        .checkout(
          courseId,
          format(new Date(), 'yyyyMMddHHmmss'),
          localStorage.getItem('language')
        )
        .then(({ data: { checkoutUrl } }) => {
          window.location.replace(checkoutUrl)
        })
    } else {
      courseService.enroll(courseId).then((res) => {
        if (res.status === 200) {
          setIsEnrolled(true)
          setEnrollVisible(false)
        }
      })
      closeEnrollConfirmDialog()
    }
  }

  return (
    <>
      {isShown && (
        <EnrollConfirmDialog
          onClose={closeEnrollConfirmDialog}
          onConfirm={confirmEnrollCourse}
          onCancel={closeEnrollConfirmDialog}
        />
      )}
      <div className="letmeet-sidebar course-details-sidebar">
        <div className="inner">
          <div className="letmeet-widget">
            <div className="video-area">
              <div className="thumbnail video-popup-wrapper">
                <img
                  className="radius-small w-100"
                  src={`${data.image}`}
                  alt="Course Video Thumb"
                />
                <button
                  onClick={() => setToggler(!toggler)}
                  className="video-play-btn position-to-top video-popup-activation"
                >
                  <span className="play-icon" />
                </button>
                <FsLightbox toggler={toggler} sources={data.videoLink} />
              </div>
            </div>
            <div className="letmeet-widget-details mt--35">
              <div className="widget-content">
                <ul>
                  {courseData.scheduleType && (
                    <li>
                      <span>
                        <i className="icon-time-line" />{' '}
                        {translation('courseDetails.duration')}
                      </span>
                      <span>
                        {calculateCourseTotalDuration(
                          courseData.startDate,
                          courseData.endDate,
                          courseData.daysOfWeek,
                          courseData.schedules,
                          courseData.scheduleType,
                          courseData.lessonNumberPerWeek,
                          courseData.startTime,
                          courseData.endTime
                        )}{' '}
                        {translation('courseDetails.hours')}
                      </span>
                    </li>
                  )}
                  {courseData.grade && (
                    <li>
                      <span>
                        <i className="icon-bar-chart-2-line" />
                        {translation('courseDetails.grade')}
                      </span>
                      <span>{gradeDisplay(get(courseData, 'grade', ''))}</span>
                    </li>
                  )}
                  {courseData.firstName && courseData.lastName && (
                    <li>
                      <span>
                        <i className="icon-user-2-line_tie" />
                        {translation('courseDetails.owner')}
                      </span>
                      <span>
                        {get(courseData, 'owner.firstName', '') +
                          ' ' +
                          get(courseData, 'owner.lastName')}
                      </span>
                    </li>
                  )}
                  <li>
                    <span>
                      <i className="icon-calendar-2-line" />
                      {translation('courseDetails.startDate')}
                    </span>
                    <span>
                      {courseData?.startDate &&
                        format(new Date(courseData.startDate), 'dd/MM/yyyy')}
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="icon-calendar-2-line" />
                      {translation('courseDetails.endDate')}
                    </span>
                    <span>
                      {courseData?.endDate &&
                        format(new Date(courseData.endDate), 'dd/MM/yyyy')}
                    </span>
                  </li>
                </ul>
                {isEnrollVisible && (
                  <div className="read-more-btn mt--45">
                    <button className="edu-btn btn-bg-alt btn-for-show w-100 text-center">
                      {translation('courseDetails.price')}:{' '}
                      {get(courseData, 'price') > 0
                        ? numberWithCommas(courseData.price) + ' VND'
                        : 'Free'}
                    </button>
                  </div>
                )}
                {!isEnrollVisible && !isCourseDisabled && (
                  <div className="read-more-btn mt--15">
                    <a
                      className="edu-btn w-100 text-center edu-btn-hover"
                      href={
                        courseData && courseData.link !== null
                          ? courseData.link
                          : data.link
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {translation('courseDetails.joinClass')}
                    </a>
                  </div>
                )}
                {isEnrollVisible && !isCourseDisabled && (
                  <div className="read-more-btn mt--15">
                    <a
                      className="edu-btn w-100 text-center edu-btn-hover"
                      onClick={enrollCourse}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {translation('courseDetails.enroll')}
                    </a>
                  </div>
                )}
                {isCourseDisabled && (
                  <div className="read-more-btn mt--15">
                    <a
                      className="edu-btn w-100 text-center edu-btn-hover btn-disabled"
                      rel="noreferrer"
                    >
                      {translation('courseDetails.courseDisabled')}
                    </a>
                  </div>
                )}
                <div className="read-more-btn mt--30 text-center">
                  <div className="letmeet-post-share">
                    <span>{translation('courseDetails.share')}: </span>
                    <a className="linkedin" href="#">
                      <i className="icon-linkedin" />
                    </a>
                    <a className="facebook" href="#">
                      <i className="icon-Fb" />
                    </a>
                    <a className="twitter" href="#">
                      <i className="icon-Twitter" />
                    </a>
                    <a className="youtube" href="#">
                      <i className="icon-youtube" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseInfo
