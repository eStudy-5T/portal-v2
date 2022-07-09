import React from 'react'
import { useTranslation } from 'react-i18next'

function SortBy(props) {
  const { extraClass, onFilterChange } = props
  const { t: translation } = useTranslation()

  const onChangeChecked = (event) => {
    onFilterChange('sort', event.target.value)
  }
  return (
    <div className={`edu-course-widget widget-shortby ${extraClass || ''}`}>
      <div className="inner">
        <h5 className="widget-title">{translation('courseQuery.sortBy')}</h5>
        <div className="content">
          <div className="edu-form-check">
            <input
              className="input-radio"
              type="radio"
              id="sortby-none"
              name="sortby"
              value="sortby-none"
              onChange={onChangeChecked}
              defaultChecked
            />
            <label htmlFor="sortby-none">
              {translation('courseQuery.sortNone')}
            </label>
          </div>
          <div className="edu-form-check">
            <input
              className="input-radio"
              type="radio"
              id="sortby-name-a-z"
              name="sortby"
              value="sortby-name-a-z"
              onChange={onChangeChecked}
            />
            <label htmlFor="sortby-name-a-z">
              {translation('courseQuery.sortNameAZ')}
            </label>
          </div>
          <div className="edu-form-check">
            <input
              className="input-radio"
              type="radio"
              id="sortby-name-z-a"
              name="sortby"
              value="sortby-name-z-a"
              onChange={onChangeChecked}
            />
            <label htmlFor="sortby-name-z-a">
              {translation('courseQuery.sortNameZA')}
            </label>
          </div>
          <div className="edu-form-check">
            <input
              className="input-radio"
              type="radio"
              id="sortby-price-lowest"
              name="sortby"
              value="sortby-price-lowest"
              onChange={onChangeChecked}
            />
            <label htmlFor="sortby-price-lowest">
              {translation('courseQuery.sortPriceLoHi')}
            </label>
          </div>
          <div className="edu-form-check">
            <input
              className="input-radio"
              type="radio"
              id="sortby-price-highest"
              name="sortby"
              value="sortby-price-highest"
              onChange={onChangeChecked}
            />
            <label htmlFor="sortby-price-highest">
              {translation('courseQuery.sortPriceHiLo')}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortBy
