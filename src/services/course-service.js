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
  getTeacherCourses: (searchTerm, { offset = 1, limit = 9 }) => {
    return request.get('/courses', {
      params: {
        q: searchTerm,
        offset,
        limit,
        type: 'teacher'
      }
    })
  },
  getEnrollments: (courseId) => {
    return request.get(`/courses/${courseId}/enrollments`)
  }
}

export default courseService
