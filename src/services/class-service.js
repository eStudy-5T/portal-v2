import request from '../utils/configs/http-config'

const classService = {
  getSpecificClass: (classId) => {
    return request.get(`/classes/${classId}`)
  },
  updateClass: (classId, data) => {
    return request.put(`/classes/${classId}`, data)
  },
  deleteClass: (classId) => {
    return request.delete(`/classes//${classId}`)
  }
}

export default classService
