import axios from '../plugins/axios'

const HOST = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

export default {
  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/banners`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  uploadBannerImage (payload = {}) {
    const data = payload.formData

    return new Promise((resolve, reject) => {
      axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `${HOST}/banners/image`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
