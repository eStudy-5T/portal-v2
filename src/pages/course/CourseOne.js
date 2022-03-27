import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import PaginationOne from '../../components/pagination/PaginationOne'
import CourseTypeOne from '../../components/course/CourseTypeOne'
import CourseData from '../../data/course/CourseData.json'

function CourseOne() {
  const CourseItems = CourseData.slice(0, 9)
  return (
    <>
      <SEO title="Course Style - 1" />
      <Layout>
        <BreadcrumbOne
          title="Course Style - 1"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Course Style - 1"
        />
        <div className="edu-course-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="short-by">
                  <p>
                    Showing <span>9</span> Of <span>42</span> Results
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="edu-search-box-wrapper text-start text-md-end">
                  <div className="edu-search-box">
                    <form action="#">
                      <input type="text" placeholder="Search Course..." />
                      <button className="search-button">
                        <i className="icon-search-line" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-5 mt--10">
              {CourseItems.map((item) => (
                <ScrollAnimation
                  animateIn="fadeInUp"
                  animateOut="fadeInOut"
                  className="col-12 col-sm-6 col-lg-4"
                  animateOnce
                  key={item.id}
                >
                  <CourseTypeOne data={item} />
                </ScrollAnimation>
              ))}
            </div>
            <div className="row">
              <div className="col-lg-12 mt--60">
                <PaginationOne />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CourseOne
