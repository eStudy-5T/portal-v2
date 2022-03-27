import React, { useState, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { FaSpinner } from 'react-icons/fa'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import PostOne from '../../components/post/PostOne'
import PostData from '../../data/blog/PostData.json'

function BlogLoadMore() {
  const [getAllItems] = useState(PostData)
  const [dataVisibleCount, setDataVisibleCount] = useState(6)
  const [dataIncrement] = useState(3)
  const [noMorePost, setNoMorePost] = useState(false)
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    setVisibleItems(getAllItems.filter((item) => item.id <= dataVisibleCount))
  }, [])

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
      <SEO title="Blog Grid( Load More )" />
      <Layout>
        <BreadcrumbOne
          title="Blog Grid( Load More )"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Blog Grid( Load More )"
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <div className="row g-5">
                  {visibleItems.map((item) => (
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      animateOnce
                      className="col-lg-4 col-md-6 col-12"
                      key={item.id}
                    >
                      <PostOne data={item} />
                    </ScrollAnimation>
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
                        'All Posts Displayed'
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
          </div>
        </div>
      </Layout>
    </>
  )
}

export default BlogLoadMore
