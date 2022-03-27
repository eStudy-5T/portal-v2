import React from 'react'

function LanguageOne(props) {
  return (
    <div
      className={`edu-course-widget widget-shortby ${props.extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Language</h5>
        <div className="content">
          <div className="edu-form-check">
            <input type="checkbox" id="lang-check1" />
            <label htmlFor="lang-check1">All Language</label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="lang-check2" />
            <label htmlFor="lang-check2">Arabic</label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="lang-check3" />
            <label htmlFor="lang-check3">English</label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="lang-check4" />
            <label htmlFor="lang-check4">Russian</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageOne
