import request from '../utils/configs/http-config'

const teacherProfileService = {
  uploadProfile: (data) => {
    return request.post('/teacher-info/upload', data)
  }
}

export default teacherProfileService
