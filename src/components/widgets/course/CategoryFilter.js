import React, { useEffect, useState } from 'react'
import courseService from '../../../services/course-service'
import { useTranslation } from 'react-i18next'

function CategoryFilter(props) {
  const { extraClass, onFilterChange } = props
  const { t: translation } = useTranslation()
  const [categories, setCategories] = useState([])

  const onChangeChecked = (event) => {
    onFilterChange('category', `category-${event.target.value}`)
  }

  useEffect(() => {
    let isMounted = true
    courseService.getCategoryOptions().then(({ data }) => {
      if (isMounted) {
        setCategories(data)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={`edu-course-widget widget-shortby ${extraClass || ''}`}>
      <div className="inner">
        <h5 className="widget-title">
          {translation('courseQuery.categoryFilter')}
        </h5>
        <div className="content limited-height">
          <div className="edu-form-check">
            <input
              className="input-radio"
              type="radio"
              id="category-all"
              name="filterbycategory"
              value="category-all"
              onChange={onChangeChecked}
              defaultChecked
            />
            <label htmlFor="category-all">
              {translation('courseQuery.allCategories')}
            </label>
          </div>
          {categories?.map((cat) => (
            <div key={cat.code} className="edu-form-check">
              <input
                className="input-radio"
                type="radio"
                id={cat.code}
                name="filterbycategory"
                value={cat.code}
                onChange={onChangeChecked}
              />
              <label htmlFor={cat.code}>{translation(cat.name)}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter
