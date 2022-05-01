/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const link = "https://meet.google.com/ppi-nrzj-wgu"

function MeetingLink(props) {
  const { shouldShow, meetingLink } = props;
  const { t: translation } = useTranslation()

  const [show, setShow] = useState(Boolean(shouldShow));

  const close = () => {
    if (show === false) return;
    setShow(false);
  }

  const copyLink = () => {
    navigator.clipboard.writeText(meetingLink || link)
      .then(() => {
        toast.success("Copied")
      })
  }

  return !show ? null : (
    <div className="edu-meeting-link w-100 h-100">
      <div className="row my-5 p-0 container">
        <div className="p-0 thumbnail" >
          <div className="close-button" onClick={close}>
            <i className="ri-close-line"></i>
          </div>
          <img
            className="edu-meeting-link__image"
            src="https://blog.gapowork.vn/content/images/2021/09/Zoom-meetings-SMART-Recovery-1.jpeg"
          >
          </img>
          <div className="content-overlay">
            <h4 className="title">
              {translation("courses.showMeetingLinkTitle")}
            </h4>
          </div>
        </div>
        <div className="edu-meeting-link__action h-100 w-100 p-0">
          <a className="rn-btn edu-btn me-5" href={meetingLink || link} target="_blank" rel="noreferrer">
            <span>Go to meeting room</span>
            <i className="icon-arrow-right-line-right" />
          </a>
          <button className="rn-btn edu-btn btn-white ms-5" onClick={copyLink}>
            <span>Copy meeting link</span>
            <i className="ri-clipboard-line" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeetingLink