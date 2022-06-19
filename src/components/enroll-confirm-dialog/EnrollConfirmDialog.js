/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useTranslation } from 'react-i18next'

function EnrollConfirmDialog(props) {
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
        <div className="p-0 thumbnail">
          <img
            className="edu-meeting-link__image"
            src={`${process.env.PUBLIC_URL}/images/feature/meet-photo.png`}
          ></img>
          <div className="content-overlay">
            <h4 className="title">
              {translation('courseDetails.enrollConfirm')}
            </h4>
            <div className="edu-meeting-link__action">
              <button className="rn-btn edu-btn btn-white" onClick={confirm}>
                <span>{translation('courseDetails.confirm')}</span>
                <i className="ri-clipboard-line" />
              </button>
              <button className="rn-btn edu-btn btn-white" onClick={cancel}>
                <span>{translation('courseDetails.cancel')}</span>
                <i className="ri-clipboard-line" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrollConfirmDialog
