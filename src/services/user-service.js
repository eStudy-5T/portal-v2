import request from '../utils/configs/http-config'

const userService = {
  fetchUserInfo: (userId) => {
    return request.get(`/user/${userId}`)
  },
  uploadAvatar: (avatar) => {
    const formData = new FormData()
    formData.append('uploadFile', avatar, avatar.name)

    return request.post('/user/upload-avatar', formData)
  },
  update: (userId, userInfo) => {
    return request.put(`/user/${userId}`, userInfo)
  },
  getEnrolledCourses: (userId, searchText, paginationOptions, queryOptions) => {
    const { offset = 1, limit = 8 } = paginationOptions
    const {
      sortBy = 'sortby-none',
      categoryFilter = 'category-all',
      gradeFilter = 'grade-all',
      rangePrice = -1
    } = queryOptions

    return request.get(`/user/${userId}/enrolled-courses`, {
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
  getStudents: (userId) => {
    return request.get(`/user/${userId}/get-students`)
  }
}

export default userService
