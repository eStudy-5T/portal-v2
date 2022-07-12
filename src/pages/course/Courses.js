import React, { useEffect, useState } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import SEO from '../../common/SEO'
import Layout from '../../common/Layout'
import Breadcrumb from '../../common/breadcrumb/Breadcrumb'
import CourseTypeOne from '../../components/course/CourseTypeOne'
import SortBy from '../../components/widgets/course/SortBy'
import CategoryFilter from '../../components/widgets/course/CategoryFilter'
import GradeFilter from '../../components/widgets/course/GradeFilter'
import FilterByPrice from '../../components/widgets/course/FilterByPrice'
import debounce from 'lodash/debounce'
import ModifyCourseAccessDialog from '../../components/modify-course-access-dialog/ModifyCourseAccessDialog'
import { Skeleton } from '@mui/material'

import courseService from '../../services/course-service'

// i18
import { useTranslation } from 'react-i18next'
import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import { Checkbox, FormControlLabel, Pagination } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

const ROLE = {
  GUEST: 'guest',
  STUDENT: 'student',
  TEACHER: 'teacher'
}

function CourseOne() {
  const [isShowMyFavorite, setIsShowFavorite] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchText, setSearchText] = useState('')
  const [CourseData, setCourseData] = useState([])
  const [CourseCount, setCourseCount] = useState(0)
  const [queryOptions, setQueryOptions] = useState({
    sortBy: 'sortby-none',
    categoryFilter: 'category-all',
    gradeFilter: 'grade-all',
    rangePrice: -1,
    showFavorite: false
  })
  const [isModifyAccessPopupShown, setPopupModifyAccessConfirm] =
    useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedAction, setSelectedAction] = useState(null)
  const [accessChanged, setAccessChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const userId = localStorage.getItem('currentUserId')
  const userRole = ROLE.TEACHER
  const isAdmin = get(
    JSON.parse(localStorage.getItem('currentUser')),
    'isAdmin',
    false
  )

  const { t: translation } = useTranslation()

  const debouncedFetchData = debounce(
    async (pSearchText, paginationOptions = {}, queryOptions = {}) => {
      const {
        data: { courses, count }
      } = await courseService.getCourses(
        userId,
        String(pSearchText).trim().toLowerCase(),
        paginationOptions,
        queryOptions
      )

      setCourseData(courses)
      setCourseCount(count)
      setIsLoading(false)
    },
    750
  )

  useEffect(() => {
    const offset = (pageNumber - 1) * pageSize

    if (pageSize) {
      setIsLoading(true)
      debouncedFetchData(searchText, { offset, limit: pageSize }, queryOptions)
    }

    if (accessChanged) {
      setAccessChanged(false)
    }

    return () => {
      debouncedFetchData.cancel()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isShowMyFavorite,
    pageNumber,
    pageSize,
    queryOptions,
    userId,
    userRole,
    accessChanged
  ])

  const search = () => {
    const offset = (pageNumber - 1) * pageSize

    if (pageSize) {
      setIsLoading(true)
      debouncedFetchData(searchText, { offset, limit: pageSize }, queryOptions)
    }
  }

  const handleChangePageNumber = (event, value) => {
    setPageNumber(isNumber(value) ? value : 1)
  }

  const handleChangePageSize = (event) => {
    const tempPageSize = event.target.value
    if (CourseCount >= tempPageSize && pageSize !== tempPageSize) {
      setPageSize(tempPageSize)
      setPageNumber(1)
    }
  }

  const handleChangeIsShowFavoriteCourse = async (event) => {
    setQueryOptions({ ...queryOptions, showFavorite: !isShowMyFavorite })
    setPageNumber(1)
    const offset = (pageNumber - 1) * pageSize
    if (pageSize) {
      debouncedFetchData(searchText, { offset, limit: pageSize }, queryOptions)
    }
    setIsShowFavorite(!isShowMyFavorite)
  }

  const handleFilterChange = (filter, value) => {
    switch (filter) {
      case 'sort':
        setQueryOptions({ ...queryOptions, sortBy: value })
        break
      case 'category':
        setQueryOptions({ ...queryOptions, categoryFilter: value })
        break
      case 'grade':
        setQueryOptions({ ...queryOptions, gradeFilter: value })
        break
      case 'filterByPrice':
        setQueryOptions({ ...queryOptions, rangePrice: value })
        break
      default:
        break
    }
  }

  const handleChangeSearchText = (event) => {
    setSearchText(event.target.value)
  }

  const onCancel = () => {
    setPopupModifyAccessConfirm(false)
  }

  const onClose = () => {
    setPopupModifyAccessConfirm(false)
  }

  const onModifyAccessClick = () => {
    setPopupModifyAccessConfirm(true)
  }

  const onConfirm = async (courseId) => {
    switch (selectedAction) {
      case 'activate':
        const result = await courseService.activate(selectedCourse)
        if (result.status === 200) {
          setAccessChanged(true)
          window.location.reload()
        }
        break
      case 'deactivate':
        const result2 = await courseService.deactivate(selectedCourse)
        if (result2.status === 200) {
          setAccessChanged(true)
          window.location.reload()
        }
        break
      default:
        setSelectedAction(null)
        setSelectedCourse(null)
        break
    }
  }

  return (
    <>
      <SEO title={translation('nav.courses')} />
      <Layout>
        <Breadcrumb title={translation('nav.courses')} />
        {isModifyAccessPopupShown && (
          <ModifyCourseAccessDialog
            onClose={onClose}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
        <div className="edu-course-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="short-by">
                      <p>
                        <span>{translation('courses.showing')} </span>
                        <input
                          className="edu-size-number px-0"
                          type="number"
                          max={CourseCount || 0}
                          value={pageSize}
                          onChange={handleChangePageSize}
                        />
                        <span>
                          &nbsp;{translation('courses.of')}
                          &nbsp;{CourseCount}&nbsp;
                          {translation('courses.results')}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="row g-5">
                      <div className="edu-search-box-wrapper text-start text-md-end">
                        <div className="edu-search-box">
                          <input
                            type="text"
                            placeholder={translation('courses.searchCourse')}
                            value={searchText}
                            onChange={handleChangeSearchText}
                          />
                          <button className="search-button" onClick={search}>
                            <i className="icon-search-line" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-5 mt--10">
                  {isLoading ? (
                    <>
                      <div className="col-sm-6 col-lg-6">
                        <Skeleton
                          variant="rectangular"
                          sx={{ borderRadius: '5px' }}
                        >
                          <CourseTypeOne />
                        </Skeleton>
                      </div>
                      <div className="col-sm-6 col-lg-6">
                        <Skeleton
                          variant="rectangular"
                          sx={{ borderRadius: '5px' }}
                        >
                          <CourseTypeOne />
                        </Skeleton>
                      </div>
                    </>
                  ) : (
                    CourseData.map((item) => {
                      return (
                        <ScrollAnimation
                          animateIn="fadeInUp"
                          animateOut="fadeInOut"
                          className="col-sm-6 col-lg-6"
                          animateOnce
                          key={item.id}
                        >
                          <CourseTypeOne
                            data={item}
                            isAdmin={isAdmin}
                            onModifyAccessClick={onModifyAccessClick}
                            setSelectedCourse={setSelectedCourse}
                            setSelectedAction={setSelectedAction}
                          />
                        </ScrollAnimation>
                      )
                    })
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                {userId ? (
                  <div className="edu-course-widget mb-5">
                    <FormControlLabel
                      control={
                        <Checkbox
                          disableRipple
                          size="large"
                          onClick={handleChangeIsShowFavoriteCourse}
                          icon={<FavoriteBorder />}
                          checkedIcon={
                            <Favorite sx={{ color: 'var(--color-primary)' }} />
                          }
                          checked={isShowMyFavorite}
                        />
                      }
                      label={translation('courses.favoriteCourses')}
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '16px',
                          fontWeight: 500
                        },
                        ':hover': {
                          '& .MuiCheckbox-root': {
                            color: 'var(--color-primary)'
                          }
                        }
                      }}
                    />
                  </div>
                ) : null}
                <SortBy onFilterChange={handleFilterChange} />
                <CategoryFilter
                  extraClass="mt--40"
                  onFilterChange={handleFilterChange}
                />
                <GradeFilter
                  extraClass="mt--40"
                  onFilterChange={handleFilterChange}
                />
                <FilterByPrice
                  extraClass="mt--40"
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt--60 edu-course-pagination">
                <Pagination
                  count={
                    pageSize > 0
                      ? Math.ceil(CourseCount / pageSize)
                      : CourseCount
                  }
                  page={pageNumber}
                  onChange={handleChangePageNumber}
                  variant="text"
                  size="large"
                  siblingCount={2}
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CourseOne
