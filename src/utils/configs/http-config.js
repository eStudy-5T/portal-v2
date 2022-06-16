import axios from 'axios'
import 'js-console-logger'
import { toast } from 'react-toastify'

import { authHeader } from '../helpers/request-helper'
import { logOutUser } from '../helpers/user-helper'
import store from '../../redux'

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
  (error) => Promise.reject(error)
)

let refreshTokenPromise
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
      // Ensure only one request to refresh token is called when multiple requests are called with expired token
      if (!refreshTokenPromise) {
        refreshTokenPromise = httpService
          .get('/auth/refresh-token')
          .then(() => {
            refreshTokenPromise = null
          })
      }

      originalConfig._retry = true
      return refreshTokenPromise
        .then(() => {
          return axios(originalConfig)
        })
        .catch((_error) => {
          localStorage.removeItem('currentUserId')
          return Promise.reject(_error)
        })
    } else {
      if (error?.response?.data) {
        toast.error(<ToastContent content={error.response.data} />)

        if (
          ['error.csrfTokenInvalid', 'error.refreshTokenExpired'].includes(
            error?.response?.data
          ) &&
          store.getState().userInfo.isAuthenticated
        ) {
          logOutUser()
        }
      }
      return Promise.reject(error)
    }
  }
)

export default httpService
