import React from 'react'

function PriceOne(props) {
  const {
    extraClass,
    onFilterChange,
  } = props;

  const onChangeChecked = (event) => {
    onFilterChange('price', event.target.value);
  }

  return (
    <div
      className={`edu-course-widget widget-shortby ${extraClass || ''}`}
    >
      <div className="inner">
        <h5 className="widget-title">Price</h5>
        <div className="content">
          <div className="edu-form-check">
            <input type="radio" id="no-filter-price" name="filterbyprice" value="no-filter-price" onChange={onChangeChecked}/>
            <label htmlFor="no-filter-price">All Prices</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="price-lowest" name="filterbyprice" value="price-lowest" onChange={onChangeChecked}/>
            <label htmlFor="price-lowest">Price: Low to High</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="price-highest" name="filterbyprice" value="price-highest" onChange={onChangeChecked}/>
            <label htmlFor="price-highest">Price: High to Low</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="free" name="filterbyprice" value="free" onChange={onChangeChecked}/>
            <label htmlFor="free">Free</label>
          </div>
          <div className="edu-form-check">
            <input type="radio" id="paid" name="filterbyprice" value="paid" onChange={onChangeChecked}/>
            <label htmlFor="paid">Paid</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceOne
