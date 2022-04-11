import axios from 'axios'
import 'js-console-logger'
import { toast } from 'react-toastify'

import { authHeader } from '../helpers/request-helper'
import { logOutUser } from '../helpers/user-helper'

import ToastContent from '../../components/toast-content/ToastContent'

const httpService = axios.create({
  baseURL: `http://localhost:6789/api`,
  timeout: 5000,
  withCredentials: true,
  headers: authHeader()
})

httpService.interceptors.request.use(
  (config) => {
    config.headers = authHeader()

    return config
  },
  (req) => {
    window.logger.info('Network', `Request ${req.baseURL}${req.url}`, {
      options: req
    })
    return req
  },
  (error) => Promise.reject(error)
)

httpService.interceptors.response.use(
  (res) => {
    window.logger.info(
      'Network',
      `Response ${res.config.baseURL}${res.config.url}`,
      { data: res }
    )
    return res
  },
  (error) => {
    window.logger.error('Network', `Error Fetching ${error}`)
    // Check if access token is expired, then use refresh token to generate a new access and refresh token, before trying to retry the fail request
    const originalConfig = error.config
    if (
      error?.response?.status === 401 &&
      error?.response?.data === 'error.accessTokenExpired' &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true
      httpService
        .get('/auth/refresh-token')
        .then(() => {
          return httpService(originalConfig)
        })
        .catch((_error) => {
          return Promise.reject(_error)
        })
    } else {
      if (error?.response?.data) {
        toast.error(<ToastContent content={error.response.data} />)

        if (
          ['error.csrfTokenInvalid', 'error.refreshTokenExpired'].includes(
            error?.response?.data
          )
        ) {
          logOutUser()
        }
      }
      return Promise.reject(error)
    }
  }
)

export default httpService
