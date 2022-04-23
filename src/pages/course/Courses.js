import React, {useEffect, useState, useMemo} from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import Pagination from '@mui/material/Pagination';
import SectionTitle from '../../components/section-title/SectionTitle.js'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import CourseTypeOne from '../../components/course/CourseTypeOne'
import SortBy from '../../components/widgets/course/SortBy'
import PriceOne from '../../components/widgets/course/PriceOne'
import LevelOne from '../../components/widgets/course/LevelOne'
import FilterByPrice from '../../components/widgets/course/FilterByPrice'

import courseService from '../../services/course-service'

// i18
import { useTranslation } from 'react-i18next'
import { isNumber } from 'lodash';

function CourseOne() {
  const [pageNumber, setPageNumber] = useState(1)

  const [pageSize, setPageSize] = useState(9)

  const [sortBy, setSortBy] = useState('none')
  const [priceFilter, setPriceFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [rangePrice, setRangePrice] = useState(0);

  const [CourseData, setCourseData] = useState([])
  const [CourseCount, setCourseCount] = useState(9)
  const [activeFilters, setActiveFilters] = useState([])

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
        setSortBy(value);
        break;
      case 'price':
        setPriceFilter(value);
        break;
      case 'level':
        setLevelFilter(value);
        break;
      case 'fiterByPrice':
        setRangePrice(value);
        break;
      default:
        break;
    }
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

  useEffect(() => {
    const selectedNumber = () => {
      if (CourseCount > 0 && pageSize >= 0) {
        return CourseCount <= pageSize ? CourseCount : pageSize;
      }

      return 0;
    }
    setPageSize(selectedNumber);
  }, [CourseCount, pageSize]);

  useEffect(() => {
    console.log(sortBy, priceFilter, levelFilter, rangePrice);
  }, [sortBy, priceFilter, levelFilter, rangePrice])

  // const FilterControls = useMemo(
  //   () => [...new Set(CourseData.map((item) => item.filterParam))],
  //   [CourseData]
  // )
  
  const FilterControls = ['cost', 'title']

  const handleChange = (e) => {
    e.preventDefault()
    let tempData
    if (
      !activeFilters.includes(e.target.lastChild.data.toLowerCase())
    ) {
      setActiveFilters([...activeFilters, e.target.lastChild.data.toLowerCase()])
      tempData = CourseData.filter((data) => true)
    } else {
      // tempData = CourseData.filter(
      //   (data) =>
      //     data.filterParam.toLowerCase() ===
      //       e.target.textContent.toLowerCase() && data.id <= dataVisibleCount
      // )
      setActiveFilters(activeFilters.filter((item) => item !== e.target.lastChild.data.toLowerCase()))
    }
    // setVisibleItems(tempData)
  }

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
                    <row className="g-5">
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
                    </row>
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
                {/* <FilterByPrice extraClass='mt--40' onFilterChange={handleFilterChange} /> */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt--60 edu-course-pagination">
                <Pagination count={Math.ceil(CourseCount / pageSize)} page={pageNumber} onChange={handleChangePageNumber} ariant="outlined" size="large" siblingCount={2} color="primary" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CourseOne
