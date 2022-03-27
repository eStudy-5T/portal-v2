import React, { useState, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import SectionTitle from '../../components/section-title/SectionTitle'
import GalleryItem from '../../components/gallery/GalleryItem'
import FilterData from '../../data/gallery/FilterData'
import GalleryData from '../../data/gallery/GalleryData.json'

function GalleryLoadMore() {
  const [getAllItems] = useState(GalleryData)
  const [dataVisibleCount, setDataVisibleCount] = useState(6)
  const [dataIncrement] = useState(3)
  const [noMorePost, setNoMorePost] = useState(false)
  const [activeFilter, setActiveFilter] = useState('')
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    setActiveFilter(FilterData[0].text.toLowerCase())
    setVisibleItems(getAllItems.filter((item) => item.id <= dataVisibleCount))
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setActiveFilter(e.target.textContent.toLowerCase())
    let tempData
    if (
      e.target.textContent.toLowerCase() === FilterData[0].text.toLowerCase()
    ) {
      tempData = getAllItems.filter((data) => data.id <= dataVisibleCount)
    } else {
      tempData = getAllItems.filter(
        (data) =>
          data.category === e.target.textContent.toLowerCase() &&
          data.id <= dataVisibleCount
      )
    }
    setVisibleItems(tempData)
  }

  const handleLoadMoreBtn = (e) => {
    e.preventDefault()
    const tempCount = dataVisibleCount + dataIncrement
    if (dataVisibleCount >= getAllItems.length) {
      setNoMorePost(true)
    } else {
      setDataVisibleCount(tempCount)
      setVisibleItems(getAllItems.filter((data) => data.id <= tempCount))
    }
  }

  return (
    <>
      <SEO title="Gallery( Load More )" />
      <Layout>
        <BreadcrumbOne
          title="Gallery( Load More )"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Gallery( Load More )"
        />
        <div className="edu-gallery-grid-area masonary-wrapper-activation edu-section-gap bg-image overflow-hidden">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <SectionTitle
                  classes="text-start"
                  slogan="Gallery"
                  title="Gallery Grid (Column 3)"
                />
              </div>
              <div className="col-lg-6">
                <div className="button-group isotop-filter filters-button-group d-flex justify-content-start justify-content-lg-end">
                  {FilterData.map((filter) => (
                    <button
                      onClick={handleChange}
                      key={filter.id}
                      className={
                        filter.text.toLowerCase() === activeFilter
                          ? 'is-checked'
                          : ' '
                      }
                    >
                      {filter.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="letmeet-gallery-items row g-5 mt--5">
              {visibleItems.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6 col-12">
                  <GalleryItem data={item} />
                </div>
              ))}
            </div>
            <div className="row text-center mt--60">
              <div className="col-lg-12">
                <button
                  className="edu-btn"
                  onClick={handleLoadMoreBtn}
                  disabled={noMorePost ? 'disabled' : null}
                >
                  {noMorePost ? (
                    'All Items Displayed'
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
          </div>
        </div>
      </Layout>
    </>
  )
}

export default GalleryLoadMore
