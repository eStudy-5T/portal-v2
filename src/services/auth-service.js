import request from '../utils/configs/http-config'

const authService = {
  register: (data) => {
    return request.post('/auth/signup', data)
  },

  login: (data) => {
    return request.post('/auth/login', data)
  }
}

export default authService
