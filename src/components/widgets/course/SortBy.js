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
            <input className='input-radio' type="radio" id="sortby-none" name="sortby" value="sortby-none" onChange={onChangeChecked} defaultChecked/>
            <label htmlFor="sortby-none">None</label>
          </div>
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="sortby-name-a-z" name="sortby" value="sortby-name-a-z" onChange={onChangeChecked} />
            <label htmlFor="sortby-name-a-z">Name (A-Z)</label>
          </div>
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="sortby-name-z-a" name="sortby" value="sortby-name-z-a" onChange={onChangeChecked}/>
            <label htmlFor="sortby-name-z-a">Name (Z-A)</label>
          </div>
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="sortby-price-lowest" name="sortby" value="sortby-price-lowest" onChange={onChangeChecked}/>
            <label htmlFor="sortby-price-lowest">Price: Low to High</label>
          </div>
          <div className="edu-form-check">
            <input className='input-radio' type="radio" id="sortby-price-highest" name="sortby" value="sortby-price-highest" onChange={onChangeChecked}/>
            <label htmlFor="sortby-price-highest">Price: High to Low</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortBy
