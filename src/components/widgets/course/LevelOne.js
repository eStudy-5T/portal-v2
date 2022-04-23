import React from 'react'

function LevelOne(props) {
  const {
    extraClass,
    onFilterChange,
  } = props;

  const onChangeChecked = (event) => {
    onFilterChange('level', event.target.value);
  }
  return (
    <div
      className={`edu-course-widget widget-shortby ${extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Level</h5>
        <div className="content">
          <div className="edu-form-check">
            <input type="radio" id="all" name="filterbylevel" value="all" onChange={onChangeChecked} />
            <label htmlFor="all">All</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="Intermediate" name="filterbylevel" value="Intermediate" onChange={onChangeChecked} />
            <label htmlFor="Intermediate">Intermediate</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="Advanced" name="filterbylevel" value="Advanced" onChange={onChangeChecked}/>
            <label htmlFor="Advanced">Advanced</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="Beginner" name="filterbylevel" value="Beginner" onChange={onChangeChecked}/>
            <label htmlFor="Beginner">Beginner</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelOne
