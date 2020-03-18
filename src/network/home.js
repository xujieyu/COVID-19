import axios from './axios'
import qs from 'qs'

export const BANNER = 'banner'
export const RECOMMEND = 'recommend'


export function getLineMultidata() {
  return axios({
    //url: 'https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.json'
    url: 'https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/resultHome.json'
  })
}

export function getProvinceMultidata(provinceName) {
  return axios({
    //url: 'https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.json'
    url: 'https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/province/'+ provinceName + '.json'
  })
}

export function getHubeiMultidata() {
  return axios({
    //url: 'https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.json'
    url: 'https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/resultHubei.json'
  })
}

export function getChinaJsonData() {
  return axios({
    //url: 'https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.json'
    url: 'https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/map/china.json'
  })
}

export function getProvinceJsonData(provinceName) {
  return axios({
    //url: 'https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.json'
    url: 'https://xujieyu-1301584958.cos.ap-guangzhou.myqcloud.com/map/province/'+ provinceName + '.json'
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

