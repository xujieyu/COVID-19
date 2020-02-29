import axios from './axios'
import qs from 'qs'

export const BANNER = 'banner'
export const RECOMMEND = 'recommend'

export function getHomeMultidata() {
  return axios({
    url: 'api/g2/getOnsInfo?name=disease_h5'
  })
}

export function getLineMultidata() {
  return axios({
    url: 'https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.json'
  })
}

export function getHospitalMultidata() {
  return axios({
    url: 'https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalProvince',
    method: 'post',
    data: {
      service: 'THPneumoniaOuterService',
      args: { req: {} },
      func: 'getHospitalProvince',
      context: { channel: 'AAEEviDRbllNrToqonqBmrER' }
    },
    responseType: 'json'
  })
}

export function getHospitalCitydata(province) {
  return axios({
    url: 'https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalCityByProvince',
    method: 'post',
    data: {
      service: 'THPneumoniaOuterService',
      args: {
        req: {
          province: province
        }
      },
      func: 'getHospitalCityByProvince',
      context: { channel: 'AAEEviDRbllNrToqonqBmrER' }
    },
    responseType: 'json'
  })
}

