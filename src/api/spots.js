import axios from '../plugins/axios'

const HOST = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

export default {
  get (payload = {}) {
      return axios({
        url: `/spots`,
        method: 'get'
      }).then(res => res.data);
  },
  getOneByLocation(payload) {
      return axios({
        url: `/spots/byLocation?latitude=${payload.latitude}&longitude=${payload.longitude}`,
        method: 'get',
      }).then(res => res.data);
  },
  save (payload) {
      return axios({
        url: `/spots`,
        method: 'post',
        data: payload
      });
  },
  login (payload) {
    return axios({
      url: `/login`,
      method: 'post',
      data: payload
    }).then(res => res.data);
  }
}
