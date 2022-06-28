import React from 'react'

function SortBy(props) {
  const ele = document.getElementById('range-price')
  let value = ele?.value || 0

  const { extraClass, onFilterChange } = props

  const onChangeChecked = (event) => {
    onFilterChange('fiterByPrice', event.target.value)
  }
  return (
    <div className={`edu-course-widget widget-shortby ${extraClass || ''}`}>
      <div className="inner">
        <h5 className="widget-title">Filter By Price</h5>
        <div className="content">
          <div className="edu-form-check">
            <input
              type="range"
              id="range-price"
              name="price"
              min="0"
              max="100"
              onChange={onChangeChecked}
            />
            <div className="price__output--wrap">
              <div className="price--output">
                <span>Price: </span>
                <span>{value * 1000}VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortBy
