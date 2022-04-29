import React, {useEffect, useState} from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import Pagination from '@mui/material/Pagination';
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import CourseTypeOne from '../../components/course/CourseTypeOne'
import SortBy from '../../components/widgets/course/SortBy'
import PriceOne from '../../components/widgets/course/CategoryFilter'
import LevelOne from '../../components/widgets/course/GradeFilter'
import FilterByPrice from '../../components/widgets/course/FilterByPrice'

import courseService from '../../services/course-service'

// i18
import { useTranslation } from 'react-i18next'
import { isNumber } from 'lodash';

function CourseOne() {
  const [pageNumber, setPageNumber] = useState(1)

  const [pageSize, setPageSize] = useState(8)

  const [searchText, setSearchText] = useState('')

  const [queryOptions, setQueryOptions] = useState({
    sortBy: 'sortby-none',
    categoryFilter: 'category-all',
    gradeFilter: 'grade-all',
    rangePrice: -1
  })

  const [CourseData, setCourseData] = useState([])
  const [CourseCount, setCourseCount] = useState(8)

  const { t: translation } = useTranslation()

  const handleChangePageNumber = (event, value) => {
    setPageNumber(isNumber(value) ? value : 1);
  }

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPageNumber(1);
  }

  const handleFilterChange = (filter, value) => {
    switch (filter) {
      case 'sort':
        setQueryOptions({...queryOptions, sortBy: value})
        break;
      case 'category':
        setQueryOptions({...queryOptions, categoryFilter: value})
        break;
      case 'grade':
        setQueryOptions({...queryOptions, gradeFilter: value})
        break;
      case 'fiterByPrice':
        setQueryOptions({...queryOptions, rangePrice: value})
        break;
      default:
        break;
    }
  }

  let delayTimer = null

  const handleChangeSearchText = (e) => {
    clearTimeout(delayTimer)
    delayTimer = setTimeout(function() {
      setSearchText(String(e.target.value).trim().toLocaleLowerCase())
    }, 1000);
  }

  useEffect(() => {
    let isMounted = true;
    const offset = (pageNumber - 1) * pageSize
    async function fetchData(searchText, paginationOptions = {}, queryOptions = {}) {
      const {data: {courses, count}} = await courseService.getTeacherCourses(searchText, paginationOptions, queryOptions);
      if (isMounted) {
        setCourseData(courses)
        setCourseCount(count)
      }
    }
    fetchData(searchText, {offset, limit: pageSize}, queryOptions)
    return () => { isMounted = false };
  }, [searchText, pageNumber, pageSize, queryOptions]);

  useEffect(() => {
    const selectedNumber = () => {
      if (CourseCount > 0 && pageSize >= 0) {
        return CourseCount <= pageSize || pageSize === 0 ? CourseCount : pageSize;
      }

      return 0;
    }
    setPageSize(selectedNumber);
  }, [CourseCount, pageSize]);

  return (
    <>
      <SEO title="Courses" />
      <Layout>
        <div className="edu-course-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="short-by">
                      <p>
                        <span>{translation("courses.showing")} </span>
                        <input className="edu-size-number px-0" type="number" value={pageSize} onChange={handleChangePageSize} />
                        <span> {translation("courses.of")} {CourseCount} {translation("courses.results")}</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="row g-5">
                      <div className="edu-search-box-wrapper text-start text-md-end">
                        <div className="edu-search-box">
                          <form action="#">
                            <input type="text" placeholder={translation("courses.searchCourse")} onChange={handleChangeSearchText} />
                            <button className="search-button">
                              <i className="icon-search-line" />
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-5 mt--10">
                  {CourseData.map((item) => (
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      className="col-sm-6 col-lg-6"
                      animateOnce
                      key={item.id}
                    >
                      <CourseTypeOne data={item} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
              <div className="col-lg-4">
                <SortBy onFilterChange={handleFilterChange}/>
                <PriceOne extraClass='mt--40' onFilterChange={handleFilterChange}/>
                <LevelOne extraClass='mt--40' onFilterChange={handleFilterChange}/>
                <FilterByPrice extraClass='mt--40' onFilterChange={handleFilterChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt--60 edu-course-pagination">
                <Pagination count={pageSize > 0 ? Math.ceil(CourseCount / pageSize) : CourseCount} page={pageNumber} onChange={handleChangePageNumber} ariant="outlined" size="large" siblingCount={2} color="primary" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CourseOne
