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
  },

  resendVerifyEmail: () => {
    return request.put('/auth/resend-verify-email')
  },

  verifyAccount: (verifyToken) => {
    return request
      .get('/auth/get-csrf')
      .then(() => request.put('/auth/verify-account', { verifyToken }))
  }
}

export default authService
