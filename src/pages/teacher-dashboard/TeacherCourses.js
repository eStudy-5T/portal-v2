import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../../common/SEO'
import DashboardLayout from '../../components/dashboard/dashboard-layout'
import SortBy from '../../components/widgets/course/SortBy'
import CategoryFilter from '../../components/widgets/course/CategoryFilter'
import GradeFilter from '../../components/widgets/course/GradeFilter'
import FilterByPrice from '../../components/widgets/course/FilterByPrice'
import Pagination from '@mui/material/Pagination'
import {
  Box,
  Card,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Popover,
  Chip,
  IconButton
} from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import CategoryIcon from '@mui/icons-material/Category'
import GradingIcon from '@mui/icons-material/Grading'
import SellIcon from '@mui/icons-material/Sell'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'
import { isNumber, debounce } from 'lodash'
import courseService from '../../services/course-service'
import COURSE_STATUS from '../../utils/constants/courses-status'
import { format } from 'date-fns'
import { teacherTabs } from '../../utils/constants/dashboard-tab'

const TeacherCourses = () => {
  const { t: translation } = useTranslation()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchText, setSearchText] = useState('')
  const [courseData, setCourseData] = useState([])
  const [courseCount, setCourseCount] = useState(0)
  const [queryOptions, setQueryOptions] = useState({
    sortBy: 'sortby-none',
    categoryFilter: 'category-all',
    gradeFilter: 'grade-all',
    rangePrice: -1,
    type: undefined
  })
  const [tableHeight, setTableHeight] = useState(300)
  const [sortByEl, setSortByEl] = useState(null)
  const [categoryFilterEl, setCategoryFilterEl] = useState(null)
  const [gradeFilterEl, setGradeFilterEl] = useState(null)
  const [filterByPriceEl, setFilterByPriceEl] = useState(null)
  const isFirstTimeSetPageSize = useRef(true)
  const navigate = useNavigate()
  const tableRef = useRef()
  const userId = localStorage.getItem('currentUserId')

  const debouncedFetchData = debounce(
    async (pSearchText, paginationOptions = {}, queryOptions = {}) => {
      const {
        data: { courses, count }
      } = await courseService.getCourses(
        userId,
        String(pSearchText).trim().toLowerCase(),
        paginationOptions,
        {
          ...queryOptions,
          type: 'teacher'
        }
      )

      setCourseData(courses)
      setCourseCount(count)
      if (isFirstTimeSetPageSize.current) {
        isFirstTimeSetPageSize.current = false
        setPageSize(count <= 8 ? count : 8)
      }
    },
    750
  )

  const calculateTableHeight = useCallback(() => {
    const { top } = tableRef.current?.getBoundingClientRect() || {}
    const calculatedHeight = window.innerHeight - top - 90
    setTableHeight(Math.max(calculatedHeight, 300))
  }, [])

  useEffect(() => {
    calculateTableHeight()
    const offset = (pageNumber - 1) * pageSize

    if (pageSize) {
      debouncedFetchData(searchText, { offset, limit: pageSize }, queryOptions)
    }

    return () => {
      debouncedFetchData.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, queryOptions, calculateTableHeight])

  const search = () => {
    const offset = (pageNumber - 1) * pageSize

    if (pageSize) {
      debouncedFetchData(searchText, { offset, limit: pageSize }, queryOptions)
    }
  }

  const handleChangePageNumber = (event, value) => {
    setPageNumber(isNumber(value) ? value : 1)
  }

  const handleChangePageSize = (event) => {
    const tempPageSize = event.target.value
    if (courseCount >= tempPageSize && pageSize !== tempPageSize) {
      setPageSize(tempPageSize)
      setPageNumber(1)
    }
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
      case 'fiterByPrice':
        setQueryOptions({ ...queryOptions, rangePrice: value })
        break
      default:
        break
    }
  }

  const handleChangeSearchText = (event) => {
    setSearchText(event.target.value)
  }

  const getCourseStatus = (isOpened, isActive) => {
    if (!isOpened) {
      return <Chip label={COURSE_STATUS.DRAFT} color="info" />
    }

    if (isOpened && !isActive) {
      return <Chip label={COURSE_STATUS.PENDING} color="warning" />
    }

    if (isOpened && isActive) {
      return <Chip label={COURSE_STATUS.ACTIVE} color="success" />
    }
  }

  const handleAddNewCourse = () => navigate('/new-course')

  return (
    <DashboardLayout items={teacherTabs}>
      <SEO title="Teacher Courses" />

      <div className="edu-course-area edu-section-gap bg-color-white">
        <div className="container-md">
          <div className="row g-5">
            <div className="col-lg-12">
              <div className="row g-5 align-items-center">
                <div className="col-lg-6 col-md-12 col-12">
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
                <div className="col-lg-4 col-md-6 col-6">
                  <div className="d-flex">
                    <div className="mobile-menu-bar ml--15 ml_sm--5 d-block">
                      <button
                        className="white-box-icon header-menu"
                        onClick={(e) => setSortByEl(e.currentTarget)}
                      >
                        <SortIcon />
                      </button>
                    </div>
                    <Popover
                      className="dashboard-popover"
                      open={Boolean(sortByEl)}
                      anchorEl={sortByEl}
                      onClose={() => setSortByEl(null)}
                    >
                      <SortBy onFilterChange={handleFilterChange} />
                    </Popover>
                    <div className="mobile-menu-bar ml--15 ml_sm--5 d-block">
                      <button
                        className="white-box-icon header-menu"
                        onClick={(e) => setCategoryFilterEl(e.currentTarget)}
                      >
                        <CategoryIcon />
                      </button>
                    </div>
                    <Popover
                      className="dashboard-popover"
                      open={Boolean(categoryFilterEl)}
                      anchorEl={categoryFilterEl}
                      onClose={() => setCategoryFilterEl(null)}
                    >
                      <CategoryFilter onFilterChange={handleFilterChange} />
                    </Popover>
                    <div className="mobile-menu-bar ml--15 ml_sm--5 d-block">
                      <button
                        className="white-box-icon header-menu"
                        onClick={(e) => setGradeFilterEl(e.currentTarget)}
                      >
                        <GradingIcon />
                      </button>
                    </div>
                    <Popover
                      className="dashboard-popover"
                      open={Boolean(gradeFilterEl)}
                      anchorEl={gradeFilterEl}
                      onClose={() => setGradeFilterEl(null)}
                    >
                      <GradeFilter onFilterChange={handleFilterChange} />
                    </Popover>
                    <div className="mobile-menu-bar ml--15 ml_sm--5 d-block">
                      <button
                        className="white-box-icon header-menu"
                        onClick={(e) => setFilterByPriceEl(e.currentTarget)}
                      >
                        <SellIcon />
                      </button>
                    </div>
                    <Popover
                      className="dashboard-popover"
                      open={Boolean(filterByPriceEl)}
                      anchorEl={filterByPriceEl}
                      onClose={() => setFilterByPriceEl(null)}
                    >
                      <FilterByPrice onFilterChange={handleFilterChange} />
                    </Popover>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 col-6 d-flex justify-content-end">
                  <button className="edu-btn" onClick={handleAddNewCourse}>
                    {translation('courses.add')}
                  </button>
                </div>
              </div>
              <div className="row g-5 mt--10">
                <div className="col">
                  <Card ref={tableRef}>
                    <TableContainer
                      sx={{ width: '100%', height: tableHeight + 'px' }}
                    >
                      <Table className="dashboard-table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              {translation('courses.title')}
                            </TableCell>
                            <TableCell>
                              {translation('courses.category')}
                            </TableCell>
                            <TableCell>
                              {translation('courses.subject')}
                            </TableCell>
                            <TableCell>
                              {translation('courses.status')}
                            </TableCell>
                            <TableCell>
                              {translation('courses.updatedAt')}
                            </TableCell>
                            <TableCell>
                              {translation('courses.action')}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {courseData.slice(0, pageSize).map((course) => (
                            <TableRow key={course.id}>
                              <TableCell>
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {course.title}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>{course.category.name}</TableCell>
                              <TableCell>{course.subject.name}</TableCell>
                              <TableCell>
                                {getCourseStatus(
                                  course.isOpened,
                                  course.isActive
                                )}
                              </TableCell>
                              <TableCell>
                                {format(
                                  new Date(course.updatedAt),
                                  'dd/MM/yyyy'
                                )}
                              </TableCell>
                              <TableCell>
                                <IconButton component={Link} to="#">
                                  <EditIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className="mt--10 mb--10 mr--10 edu-course-pagination d-flex flex-column flex-sm-row justify-content-center justify-content-sm-end">
                      <div className="short-by mx-3 mb-2 mb-sm-0">
                        <p>
                          <span>{translation('courses.showing')} </span>
                          <input
                            className="edu-size-number px-0"
                            type="number"
                            max={courseCount || 0}
                            value={pageSize}
                            onChange={handleChangePageSize}
                          />
                          <span>
                            {' '}
                            {translation('courses.of')} {courseCount}{' '}
                            {translation('courses.results')}
                          </span>
                        </p>
                      </div>
                      <Pagination
                        count={
                          pageSize > 0
                            ? Math.ceil(courseCount / pageSize)
                            : courseCount
                        }
                        page={pageNumber}
                        onChange={handleChangePageNumber}
                        siblingCount={2}
                        color="primary"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TeacherCourses
