import React from 'react'

function RatingOne(props) {
  return (
    <div
      className={`edu-course-widget widget-shortby ${props.extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Short By Rating</h5>
        <div className="content">
          <div className="edu-form-check">
            <input type="checkbox" id="rating-check1" />
            <label htmlFor="rating-check1">
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="on icon-Star" />
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="rating-check2" />
            <label htmlFor="rating-check2">
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="off icon-Star" />
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="rating-check3" />
            <label htmlFor="rating-check3">
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="off icon-Star" />
              <span className="off icon-Star" />
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="rating-check4" />
            <label htmlFor="rating-check4">
              <span className="on icon-Star" />
              <span className="on icon-Star" />
              <span className="off icon-Star" />
              <span className="off icon-Star" />
              <span className="off icon-Star" />
            </label>
          </div>

          <div className="edu-form-check">
            <input type="checkbox" id="rating-check5" />
            <label htmlFor="rating-check5">
              <span className="on icon-Star" />
              <span className="off icon-Star" />
              <span className="off icon-Star" />
              <span className="off icon-Star" />
              <span className="off icon-Star" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingOne
