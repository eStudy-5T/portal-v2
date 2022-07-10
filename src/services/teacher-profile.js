import request from '../utils/configs/http-config'

const teacherProfileService = {
  uploadProfile: (data) => {
    return request.post('/teacher-info/upload', data)
  },
  getProfileById: (userId) => {
    return request.get(`/teacher-info/${userId}`)
  }
}

export default teacherProfileService
