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
  enrollCourse: (courseId, ownerId) => {
    console.log({courseId, ownerId})
    return request.post('/courses/enroll', {courseId, ownerId})
  }
}

export default userService
