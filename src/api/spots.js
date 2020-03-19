import axios from '../plugins/axios'

const HOST = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

export default {
  get (payload = {}) {
      return axios({
        url: `/spots`,
        method: 'get'
      })
  },
  save (payload) {
      return axios({
        url: `/spots`,
        method: 'post'
      })
  },
  uploadBannerImage (payload = {}) {
    const data = payload.formData
    return axios({
      headers: { 'Content-Type': 'multipart/form-data' },
      url: `${HOST}/banners/image`,
      method: 'post',
      data
    })
  },
}
