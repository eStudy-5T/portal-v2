import React, { useState, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { FaSpinner } from 'react-icons/fa'
import SectionTitle from '../section-title/SectionTitle'
import CourseTypeOne from './CourseTypeOne'
import CourseData from '../../data/course/CourseData.json'

function CourseTypeFilter({ itemToShow, showLoadMore, incrementPerClick }) {
  const FilterControls = [
    ...new Set(CourseData.map((item) => item.filterParam))
  ]
  FilterControls.unshift('All')
  const numberOfCourses = itemToShow || 6
  const dataIncrement = incrementPerClick || 3
  const [noMorePost, setNoMorePost] = useState(false)
  const [dataVisibleCount, setDataVisibleCount] = useState(numberOfCourses)
  const [activeFilter, setActiveFilter] = useState('')
  const [visibleItems, setVisibleItems] = useState([])
  useEffect(() => {
    setActiveFilter(FilterControls[0].toLowerCase())
    setVisibleItems(CourseData.filter((item) => item.id <= dataVisibleCount))
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setActiveFilter(e.target.textContent.toLowerCase())
    let tempData
    if (
      e.target.textContent.toLowerCase() === FilterControls[0].toLowerCase()
    ) {
      tempData = CourseData.filter((data) => data.id <= dataVisibleCount)
    } else {
      tempData = CourseData.filter(
        (data) =>
          data.filterParam.toLowerCase() ===
            e.target.textContent.toLowerCase() && data.id <= dataVisibleCount
      )
    }
    setVisibleItems(tempData)
  }

  const handleLoadMoreBtn = (e) => {
    e.preventDefault()
    const tempCount = dataVisibleCount + dataIncrement
    if (dataVisibleCount >= CourseData.length) {
      setNoMorePost(true)
    } else {
      setDataVisibleCount(tempCount)
      setVisibleItems(CourseData.filter((data) => data.id <= tempCount))
    }
  }

  return (
    <>
      <div className="row g-5 align-items-center mb--30">
        <div className="col-lg-6">
          <SectionTitle
            classes="text-start"
            slogan="Popular Courses"
            title="Our Popular Courses"
          />
        </div>
        <div className="col-lg-6">
          <div className="button-group isotop-filter filters-button-group d-flex justify-content-start justify-content-lg-end">
            {FilterControls.map((filter, i) => (
              <button
                onClick={handleChange}
                key={i}
                className={
                  filter.toLowerCase() === activeFilter ? 'is-checked' : ' '
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-5">
        {visibleItems.map((item) => (
          <ScrollAnimation
            animateIn="fadeInUp"
            animateOut="fadeInOut"
            className="col-12 col-sm-12 col-xl-4 col-md-6"
            animateOnce
            key={item.id}
          >
            <CourseTypeOne data={item} />
          </ScrollAnimation>
        ))}
      </div>

      {showLoadMore === 'enable' && (
        <div className="row text-center mt--60">
          <div className="col-lg-12">
            <button
              className="edu-btn"
              onClick={handleLoadMoreBtn}
              disabled={noMorePost ? 'disabled' : null}
            >
              {noMorePost ? (
                'All Courses Displayed'
              ) : (
                <span>
                  Load More
                  <span className="letmeet-spin-icon">
                    <FaSpinner />
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseTypeFilter
