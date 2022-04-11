import request from '../utils/configs/http-config'

const authService = {
  register: (data) => {
    return request
      .get('/auth/get-csrf')
      .then(() => request.post('/auth/signup', data))
  },

  login: (data) => {
    return request
      .get('/auth/get-csrf')
      .then(() => request.post('/auth/login', data))
  },

  logout: () => {
    return request.get('/auth/logout')
  }
}

export default authService
