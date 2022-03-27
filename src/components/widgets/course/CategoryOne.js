import React from 'react'

function CategoryOne(props) {
  return (
    <div
      className={`edu-course-widget widget-category ${props.extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Categories</h5>
        <div className="content">
          <div className="edu-form-check">
            <input type="checkbox" id="cat-check1" />
            <label htmlFor="cat-check1">
              Art & Design <span>(24)</span>
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="cat-check2" />
            <label htmlFor="cat-check2">
              Web Development <span>(12)</span>
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="cat-check3" />
            <label htmlFor="cat-check3">
              Business Management <span>(8)</span>
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="cat-check4" />
            <label htmlFor="cat-check4">
              Digital Marketing <span>(3)</span>
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="cat-check5" />
            <label htmlFor="cat-check5">
              Music & Fashion <span>(13)</span>
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="cat-check6" />
            <label htmlFor="cat-check6">
              Financial Management <span>(25)</span>
            </label>
          </div>
          <div className="edu-form-check">
            <input type="checkbox" id="cat-check7" />
            <label htmlFor="cat-check7">
              Sports <span>(19)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryOne
