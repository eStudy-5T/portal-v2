/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'

function CourseInfo({ data }) {
  const [toggler, setToggler] = useState(false)
  return (
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
                      <i className="icon-time-line" /> Duration
                    </span>
                    <span>{data.duration}</span>
                  </li>
                )}
                {data.student && (
                  <li>
                    <span>
                      <i className="icon-user-2" /> Enrolled
                    </span>
                    <span>{data.student}</span>
                  </li>
                )}
                {data.lesson && (
                  <li>
                    <span>
                      <i className="icon-draft-line" /> Lectures
                    </span>
                    <span>{data.lesson}</span>
                  </li>
                )}
                {data.level && (
                  <li>
                    <span>
                      <i className="icon-bar-chart-2-line" /> Skill Level
                    </span>
                    <span>{data.level}</span>
                  </li>
                )}
                {data.language && (
                  <li>
                    <span>
                      <i className="icon-translate" /> Language
                    </span>
                    <span>{data.language}</span>
                  </li>
                )}
                {data.quizzes && (
                  <li>
                    <span>
                      <i className="icon-artboard-line" /> Quizzes
                    </span>
                    <span>{data.quizzes}</span>
                  </li>
                )}
                {data.certificate && (
                  <li>
                    <span>
                      <i className="icon-award-line" /> Certificate
                    </span>
                    <span>
                      {data.certificate === 'available' ? 'Yes' : 'No'}
                    </span>
                  </li>
                )}
                {data.passPercentage && (
                  <li>
                    <span>
                      <img
                        className="letmeet-course-sidebar-img-icon"
                        src="/images/icons/percent.svg"
                        alt="icon Thumb"
                      />
                      Pass Percentage
                    </span>
                    <span>{data.passPercentage}%</span>
                  </li>
                )}
                {data.deadline && (
                  <li>
                    <span>
                      <i className="icon-calendar-2-line" /> Deadline
                    </span>
                    <span>{data.deadline}</span>
                  </li>
                )}
                {data.instructor && (
                  <li>
                    <span>
                      <i className="icon-user-2-line_tie" /> Instructor
                    </span>
                    <span>{data.instructor}</span>
                  </li>
                )}
              </ul>
              <div className="read-more-btn mt--45">
                <a href="#" className="edu-btn btn-bg-alt w-100 text-center">
                  Price: ${data.price}
                </a>
              </div>
              <div className="read-more-btn mt--15">
                <a href="#" className="edu-btn w-100 text-center">
                  Buy Now
                </a>
              </div>
              <div className="read-more-btn mt--30 text-center">
                <div className="letmeet-post-share">
                  <span>Share: </span>
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
  )
}

export default CourseInfo
