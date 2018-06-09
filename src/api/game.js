import { axios } from './index'
import qs from 'qs'

const game = {
  getGameTypeList () {
    var url = '/games/game-types'
    return axios.get(url).then(res => {
      return res
    })
    .catch(e => {
      return Promise.reject(e)
    })
  },

}

export default game