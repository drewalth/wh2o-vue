import axios from 'axios'
import { appLocalStorage } from '@/app/global/services'
import { apiBaseUrl, environment } from '@/app/environment'

const config = {
  baseURL: apiBaseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
  }
}

const http = axios.create(config)

/**
 * Auth interceptor
 * @description add authorization token here.
 * @param {object} config
 * @returns axios config
 */
const authInterceptor = config => {
  const token = appLocalStorage.getItem('wh2o-auth')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

http.interceptors.request.use(authInterceptor)
http.interceptors.response.use(
  response => {
    if (response.data.errors) {
      const errors = {}

      response.data.errors.forEach((error, index) => {
        errors[index] = error
      })

      if (environment === 'development') {
        /* eslint-disable-next-line no-console */
        console.error('Errors', errors)
      }

      throw errors
    } else {
      return response
    }
  },
  error => Promise.reject(error)
)

export default http;
