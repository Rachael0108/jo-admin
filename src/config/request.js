import axios from 'axios'
import qs from 'qs'
import router from "../router";
import store from '../store/index';

// 发布订阅
class EventEmitter {
  constructor() {
    this.event = {}
  }

  on(type, cbres, cbrej) {
    if (!this.event[type]) {
      this.event[type] = [[cbres, cbrej]]
    } else {
      this.event[type].push([cbres, cbrej])
    }
  }

  emit(type, res, ansType) {
    if (!this.event[type]) return
    else {
      this.event[type].forEach(cbArr => {
        if (ansType === 'resolve') {
          cbArr[0](res)
        } else {
          cbArr[1](res)
        }
      });
    }
  }
}

// 根据请求生成对应的key
function generateReqKey(config, hash) {
  const {method, url, params, data} = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data), hash].join("&");
}

// 存储已发送但未响应的请求
const pendingRequest = new Set();

// 发布订阅容器
const ev = new EventEmitter()

// 接口响应成功
function handleSuccessResponse_limit(response) {
  const reqKey = response.config.pendKey
  if (pendingRequest.has(reqKey)) {
    let x = null
    try {
      x = JSON.parse(JSON.stringify(response))
    } catch (e) {
      x = response
    }
    pendingRequest.delete(reqKey)
    ev.emit(reqKey, x, 'resolve')
    delete ev.reqKey
  }
}

// 接口走失败响应
function handleErrorResponse_limit(error) {
  if (error.type && error.type === 'limiteResSuccess') {
    return Promise.resolve(error.val)
  } else if (error.type && error.type === 'limiteResError') {
    return Promise.reject(error.val);
  } else {
    const reqKey = error.config.pendKey
    if (pendingRequest.has(reqKey)) {
      let x = null
      try {
        x = JSON.parse(JSON.stringify(error))
      } catch (e) {
        x = error
      }
      pendingRequest.delete(reqKey)
      ev.emit(reqKey, x, 'reject')
      delete ev.reqKey
    }
  }
  return Promise.reject(error);
}

const instance = axios.create({
  baseURL: 'http://127.0.0.1',
  timeout: '5000',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  cors: true,
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 10000,
})
//请求
instance.interceptors.request.use(
  (config) => {
    let hash = location.hash
// 生成请求Key
    let reqKey = generateReqKey(config, hash)
    if (pendingRequest.has(reqKey)) {
      // 如果是相同请求,在这里将请求挂起,通过发布订阅来为该请求返回结果
      // 这里需注意,拿到结果后,无论成功与否,都需要return Promise.reject()来中断这次请求,否则请求会正常发送至服务器
      let res = null
      try {
        // 接口成功响应
        res = await new Promise((resolve, reject) => {
          ev.on(reqKey, resolve, reject)
        })
        return Promise.reject({
          type: 'limiteResSuccess',
          val: res
        })
      } catch (limitFunErr) {
        // 接口报错
        return Promise.reject({
          type: 'limiteResError',
          val: limitFunErr
        })
      }
    } else {
      // 将请求的key保存在config
      config.pendKey = reqKey
      pendingRequest.add(reqKey)
    }

    if (store.getters['user/accessToken']) {
      config.headers['Access-Token'] = store.getters['user/accessToken'];
    }
    if (
      config.data &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应
instance.interceptors.response.use(
  (res) => {
    handleSuccessResponse_limit(response)
    if (res.status === 200) {
      if (res.data.status === 2000) {
        return res.data
      } else if (res.data.status === 4003) {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        router.push({name: 'login'})
      } else if (res.data.status) {
        return res.data
      } else if (!res.data.status) {
        return res
      }
      return res.data
    } else {
      console.log('系统异常，请稍后再试')
    }
  },
  (error) => {
    handleSuccessResponse_limit(response)
    console.log(error)
  }
);

export default instance
