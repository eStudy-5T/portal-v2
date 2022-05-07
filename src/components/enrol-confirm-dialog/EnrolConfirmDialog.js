/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useTranslation } from 'react-i18next'

function EnrolConfirmDialog(props) {
  const { t: translation } = useTranslation()

  const confirm = () => {
    props.onConfirm()
  }

  const cancel = () => {
    props.onCancel()
  }

  const close = () => {
    props.onClose()
  }

  return (
    <div className="edu-meeting-link w-100 h-100 modal">
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
              {translation("courseDetails.enrolConfirm")}
            </h4>
          </div>
        </div>
        <div className="edu-meeting-link__action h-100 w-100 p-0">
          <button className="rn-btn edu-btn btn-white ms-5" onClick={confirm}>
            <span>{translation("courseDetails.confirm")}</span>
            <i className="ri-clipboard-line" />
          </button>
          <button className="rn-btn edu-btn btn-white ms-5" onClick={cancel}>
            <span>{translation("courseDetails.cancel")}</span>
            <i className="ri-clipboard-line" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default EnrolConfirmDialog