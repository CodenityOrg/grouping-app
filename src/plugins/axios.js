import axios from 'axios'
import cookie from 'react-cookies'

const HOST = (window._env_ && window._env_.REACT_APP_API_URL) ||  process.env.REACT_APP_API_URL || 'http://localhost:3001'

const axiosDefaultInstance = axios.create({
  baseURL: HOST,
});

axiosDefaultInstance.interceptors.request.use(request => {
  request.headers = {
    authorization: cookie.load('token') || ''
  };
  return request;
});

axiosDefaultInstance.interceptors.response.use(response => response, error => {
  const errorResponse = error.response || error;

  // fatal error
  if (errorResponse.status >= 500) {
  }

  // too many request
  if (errorResponse.status === 429) {
  }

  // invalid data
  if (errorResponse.status === 422) {
  }

  // conflict
  if (errorResponse.status === 409) {
  }

  // not found
  if (errorResponse.status === 404) {
    console.log('status code 404')
  }

  // not permission
  if (errorResponse.status === 403) {
  }

  // bad Request
  if (errorResponse.status === 400) {
  }

  // not be authenticated
  if (errorResponse.status === 401) {
  }

  return Promise.reject(error)
})

export default axiosDefaultInstance
