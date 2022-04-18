import React, {useEffect, useState} from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne'
import PaginationOne from '../../components/pagination/PaginationOne'
import CourseTypeOne from '../../components/course/CourseTypeOne'
// import CourseData from '../../data/course/CourseData.json'

import courseService from '../../services/course-service'

// i18
import { useTranslation } from 'react-i18next'

function CourseOne() {
  const [pageNumber, setPageNumber] = useState(1)

  const [pageSize, setPageSize] = useState(9)

  const [CourseData, setCourseData] = useState([])
  const [CourseCount, setCourseCount] = useState(0)

  const { t: translation } = useTranslation()

  const handleChangePageNumber = (number) => {
    number <= CourseCount/CourseData.length && setPageNumber(number)
  }

  const handleChangePageSize = (size) => {
    setPageSize(size)
  }

  useEffect(() => {
    let isMounted = true;
    const offset = (pageNumber - 1) * pageSize
    async function fetchData(searchTerm, options) {
      const {data: {courses, count}} = await courseService.getTeacherCourses(searchTerm, options);
      if (isMounted) {
        setCourseData(courses)
        setCourseCount(count)
      }
    }
    fetchData(null, {offset, limit: pageSize})
    return () => { isMounted = false };
  }, [pageNumber, pageSize]);

  const CourseItems = CourseData.slice((pageNumber - 1) * pageSize, pageSize)
  return (
    <>
      {/* <SEO title="Course Style - 1" /> */}
      <Layout>
        {/* <BreadcrumbOne
          title="Course Style - 1"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Course Style - 1"
        /> */}
        <div className="edu-course-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="short-by">
                  <p>
                    {translation("courses.showing")} <span>{pageSize > CourseCount ? CourseCount : pageSize}</span> {translation("courses.of")} <span>{CourseCount}</span> {translation("courses.results")}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="edu-search-box-wrapper text-start text-md-end">
                  <div className="edu-search-box">
                    <form action="#">
                      <input type="text" placeholder={translation("courses.searchCourse")} />
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
