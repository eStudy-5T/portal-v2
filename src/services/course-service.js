import request from '../utils/configs/http-config'

const isUserVerified = () => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  const userId = localStorage.getItem('currentUserId')
  return regexExp.test(userId)
}

const courseService = {
  getSpecificCourse: (courseId) => {
    return request.get(`/courses/${courseId}?verified=${isUserVerified()}`)
  },
  createCourse: (data) => {
    return request.post('/courses', data)
  },
  updateCourse: (courseId, data) => {
    return request.put(`/courses/${courseId}`, data)
  },
  getCourses: (userId, searchText, paginationOptions, queryOptions) => {
    const { offset = 1, limit = 8 } = paginationOptions
    const {
      sortBy = 'sortby-none',
      categoryFilter = 'category-all',
      gradeFilter = 'grade-all',
      rangePrice = -1,
      showFavorite = false,
      type = undefined
    } = queryOptions

    return request.get('/courses', {
      params: {
        userId,
        searchText,
        offset,
        limit,
        sortBy,
        categoryFilter,
        gradeFilter,
        rangePrice,
        showFavorite,
        type
      }
    })
  },
  getEnrollments: (courseId) => {
    return request.get(`/courses/${courseId}/enrollments`)
  },
  getEnrolledStudents: (courseId) => {
    return request.get(`/courses/${courseId}/enrolled-students`)
  },
  getCreatedCourses: (ownerId) => {
    return request.get(`/courses/created-courses/${ownerId}`)
  },
  getCategoryOptions: () => {
    return request.get('/courses/categories')
  },
  getSubjectOptions: () => {
    return request.get('/courses/subjects')
  },
  submitReview: (courseId, data) => {
    return request.post(`/reviews/${courseId}`, data)
  },
  getCourseReviews: (courseId) => {
    return request.get(`/reviews/${courseId}`)
  },
  activate: (courseId) => {
    return request.post(`courses/${courseId}/active`)
  },
  deactivate: (courseId) => {
    return request.post(`courses/${courseId}/deactive`)
  },
  generateMeetLink: (courseId) => {
    return request.post(`/courses/${courseId}/generate-meet-link`, {})
  },
  enroll: (courseId) => {
    return request.post(`/course/${courseId}/enroll`, {})
  },
  checkout: (courseId, createDate, locale) => {
    return request.post(
      `/courses/${courseId}/checkout`,
      {},
      { params: { createDate, locale } }
    )
  },
  toggleFavorite: (courseId) => {
    return request.post(`/courses/${courseId}/toggle-favorite`, {})
  }
}

export default courseService
