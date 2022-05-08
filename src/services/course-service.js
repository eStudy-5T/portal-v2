import request from '../utils/configs/http-config'

const courseService = {
  getSpecificCourse: (courseId) => {
    return request.get(`/courses/${courseId}`)
  },
  createCourse: (data) => {
    return request.post('/courses', data)
  },
  updateCourse: (courseId, data) => {
    return request.put(`/courses/${courseId}`, data)
  },
  getClasses: (courseId) => {
    return request.get(`/courses/${courseId}/classes`)
  },
  createClass: (courseId, data) => {
    return request.post(`/courses/${courseId}/classes`, data)
  },
  getCourses: (searchText, paginationOptions, queryOptions) => {
    const { offset = 1, limit = 8 } = paginationOptions
    const {
      sortBy = 'sortby-none',
      categoryFilter = 'category-all',
      gradeFilter = 'grade-all',
      rangePrice = -1
    } = queryOptions

    return request.get('/courses', {
      params: {
        searchText,
        offset,
        limit,
        sortBy,
        categoryFilter,
        gradeFilter,
        rangePrice
      }
    })
  },
  getEnrollments: (courseId) => {
    return request.get(`/courses/${courseId}/enrollments`)
  }
}

export default courseService
