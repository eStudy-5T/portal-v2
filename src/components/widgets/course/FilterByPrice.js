import React from 'react'
import { useTranslation } from 'react-i18next'

function SortBy(props) {
  const ele = document.getElementById('range-price')
  let value = ele?.value || 0

  const { extraClass, onFilterChange } = props
  const { t: translation } = useTranslation()

  const onChangeChecked = (event) => {
    onFilterChange('filterByPrice', event.target.value)
  }
  return (
    <div className={`edu-course-widget widget-shortby ${extraClass || ''}`}>
      <div className="inner">
        <h5 className="widget-title">
          {translation('courseQuery.priceFilter')}
        </h5>
        <div className="content">
          <div className="edu-form-check">
            <input
              type="range"
              id="range-price"
              name="price"
              min={0}
              max={1000000}
              step={1000}
              onChange={onChangeChecked}
            />
            <div className="price__output--wrap">
              <div className="price--output">
                <span>{value} VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortBy
