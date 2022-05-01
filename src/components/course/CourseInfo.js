/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react'

// i18
import { useTranslation } from 'react-i18next'

function CourseInfo({ data }) {
  const { t: translation } = useTranslation()
  
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
                <a href="#" className="edu-btn w-100 text-center">
                  {translation("courseDetails.register")}
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
  )
}

export default CourseInfo
