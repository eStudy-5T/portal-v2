/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'
import EnrollConfirmDialog from '../../components/enroll-confirm-dialog/EnrollConfirmDialog'

// i18
import { useTranslation } from 'react-i18next'
import userService from '../../services/user-service'

const data = {
  "id": 1,
  "title": "Competitive Strategy law for all students",
  "image": "https://eduvibe.react.devsvibe.com/images/course/course-01/course-01.jpg",
  "imageDetails": "https://eduvibe.react.devsvibe.com/images/course/course-details/course-01.jpg",
  "instructor": "James Carlson",
  "duration": "3h 14m 20s",
  "durationInHour": "3 Hours",
  "durationInHourMinute": "3hr 14min",
  "level": "Intermediate",
  "language": "English",
  "deadline": "25 Dec, 2022",
  "rating": "4.9",
  "student": 763,
  "lesson": 29,
  "quizzes": 12,
  "price": "45.00",
  "oldPrice": "55.00",
  "review": 56,
  "passPercentage": 80,
  "featured": true,
  "certificate": "available",
  "filterParam": "Popularity",
  "categories": ["Language Learning", "Business"],
  "videoLink": ["https://www.youtube.com/watch?v=pNje3bWz7V8"],
  "excerpt": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  "details": "<h5>Course Description</h5> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p><h5>What You’ll Learn From This Course</h5> <ul> <li>Neque sodales ut etiam sit amet nisl purus non tellus orci ac auctor</li><li>Tristique nulla aliquet enim tortor at auctor urna. Sit amet aliquam id diam maer</li><li>Nam libero justo laoreet sit amet. Lacus sed viverra tellus in hac</li><li>Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis</li></ul> <h5>Certification</h5> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>"
}

function CourseInfo({ courseData }) {
  const { t: translation } = useTranslation()

  const [isShown, setIsShown] = useState(false)

  const [toggler, setToggler] = useState(false)

  const enrollCourse = () => {
    setIsShown(true)
  }
  
  const closeEnrollConfirmDialog = () => {
    setIsShown(false)
  }

  const confirmEnrollCourse = () => {
    try {
      const courseId = courseData.id
      const ownerId = courseData.ownerId
      userService.enrollCourse(courseId, ownerId).then((res) => {
        console.log(res)
      })
      closeEnrollConfirmDialog()
    }
    catch (err) {

    }
  }

  return (
    <>
      {isShown && <EnrollConfirmDialog onClose={closeEnrollConfirmDialog} onConfirm={confirmEnrollCourse} onCancel={closeEnrollConfirmDialog}/>}
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
                  {data.duration && (
                    <li>
                      <span>
                        <i className="icon-time-line" /> {translation("courseDetails.duration")}
                      </span>
                      <span>160 {translation("courseDetails.hours")}</span>
                    </li>
                  )}
                  {/* {data.student && (
                  <li>
                    <span>
                      <i className="icon-user-2" /> Enrolled
                    </span>
                    <span>{data.student}</span>
                  </li>
                )} */}
                  {/* {data.lesson && (
                  <li>
                    <span>
                      <i className="icon-draft-line" /> Lectures
                    </span>
                    <span>{data.lesson}</span>
                  </li>
                )} */}
                  {data.level && (
                    <li>
                      <span>
                        <i className="icon-bar-chart-2-line" />
                        {translation("courseDetails.grade")}
                      </span>
                      <span>12</span>
                    </li>
                  )}
                  {data.instructor && (
                    <li>
                      <span>
                        <i className="icon-user-2-line_tie" />
                        {translation("courseDetails.owner")}
                      </span>
                      <span>Hồ Hoàng Thương</span>
                    </li>
                  )}
                  <li>
                    <span>
                      <i className="icon-calendar-2-line" /> {translation("courseDetails.startDate")}
                    </span>
                    <span>09/04/2022</span>
                  </li>
                  <li>
                    <span>
                      <i className="icon-calendar-2-line" /> {translation("courseDetails.endDate")}
                    </span>
                    <span>09/04/2023</span>
                  </li>
                </ul>
                <div className="read-more-btn mt--45">
                  <button className="edu-btn btn-bg-alt w-100 text-center" disabled>
                    {translation("courseDetails.price")}: 450.000 VND
                  </button>
                </div>
                <div className="read-more-btn mt--15">
                  <a className="edu-btn w-100 text-center edu-btn-hover" onClick={enrollCourse}>
                    {translation("courseDetails.enroll")}
                  </a>
                </div>
                <div className="read-more-btn mt--30 text-center">
                  <div className="letmeet-post-share">
                    <span>{translation("courseDetails.share")}: </span>
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
