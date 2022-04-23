import React from 'react'

function SortBy(props) {
  const {
    extraClass,
    onFilterChange,
  } = props;

  const onChangeChecked = (event) => {
    onFilterChange('sort', event.target.value);
  }
  return (
    <div
      className={`edu-course-widget widget-shortby ${extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Sort By</h5>
        <div className="content">
          <div className="edu-form-check">
            <input type="radio" id="none" name="sortby" value="none" onChange={onChangeChecked} />
            <label htmlFor="none">None</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="name-a-z" name="sortby" value="name-a-z" onChange={onChangeChecked} />
            <label htmlFor="name-a-z">Name (A-Z)</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="name-z-a" name="sortby" value="name-z-a" onChange={onChangeChecked}/>
            <label htmlFor="name-z-a">Name (Z-A)</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortBy
