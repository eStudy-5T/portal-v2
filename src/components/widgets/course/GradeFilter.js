import React from 'react'

function GradeFilter(props) {
  const {
    extraClass,
    onFilterChange,
  } = props;

  const onChangeChecked = (event) => {
    onFilterChange('grade', event.target.value);
  }
  return (
    <div
      className={`edu-course-widget widget-shortby ${extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Grades</h5>
        <div className="content">
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="grade-all" name="filterbygrade" value="grade-all" onChange={onChangeChecked} defaultChecked/>
            <label htmlFor="grade-all">All</label>
          </div>
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="grade-primary" name="filterbygrade" value="grade-primary" onChange={onChangeChecked} />
            <label htmlFor="grade-primary">1-5</label>
          </div>
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="grade-secondary" name="filterbygrade" value="grade-secondary" onChange={onChangeChecked}/>
            <label htmlFor="grade-secondary">6-9</label>
          </div>
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="grade-high" name="filterbygrade" value="grade-high" onChange={onChangeChecked}/>
            <label htmlFor="grade-high">10-12</label>
          </div>
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="grade-others" name="filterbygrade" value="grade-others" onChange={onChangeChecked}/>
            <label htmlFor="grade-others">Others</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradeFilter
