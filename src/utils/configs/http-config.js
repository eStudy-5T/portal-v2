import axios from 'axios'
import 'js-console-logger'

import { authHeader } from '../helpers/requestHelpers'

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
    return Promise.reject(error)
  }
)

export default httpService
