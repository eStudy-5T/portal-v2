import React from 'react'

function CategoryFilter(props) {
  const {
    extraClass,
    onFilterChange,
  } = props;

  const onChangeChecked = (event) => {
    onFilterChange('category', event.target.value);
  }

  return (
    <div
      className={`edu-course-widget widget-shortby ${extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Categories</h5>
        <div className="content">
          <div className="edu-form-check">
            <input type="radio" id="category-all" name="filterbycategory" value="category-all" onChange={onChangeChecked} defaultChecked/>
            <label htmlFor="category-all">All Categories</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="category-programming" name="filterbycategory" value="category-programming" onChange={onChangeChecked}/>
            <label htmlFor="category-programming">Programming</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="category-math" name="filterbycategory" value="category-math" onChange={onChangeChecked}/>
            <label htmlFor="category-math">Math</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="category-english" name="filterbycategory" value="category-english" onChange={onChangeChecked}/>
            <label htmlFor="category-english">English</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter
