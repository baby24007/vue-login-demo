import axios from 'axios';

/**
 * 我们的额接口返回数据的结构是这样的
 * {
 *  code: 200
    data: {email: "test@jd.com",…}
    message: "SUCCESS"
 * }
 * @export
 * @param {*} response
 * @returns
 */
export function responseHandler(response) {
  // Do something with response data

  /* 纯文本类型数据处理 */
  if (response.config.responseType === 'text') {
    return response.data;
  }

  /* 以下是json类型数据的处理 */
  if (response.data && response.data.status) {
    /* eslint-disable */
    response.data.code = response.data.status;
}

// Success
if (response.data && response.data.code === 200) {
    return response.data.data;
}

// Redirect
if (response.data && response.data.code === 304) {
   // 如果接口把LocationUrl放在了header里返回的话，就取response.header.Location
   // 检查未登录，跳转到登录页面
    window.location.href = response.data.data || '/login';
    throw new Error('Url Redirect');
}

throw throwError(response);
}
export function responseErrorHandler(error) {
  const response = error.response || {};
  if ([502, 503, 504].includes(response.status)) {
      window.location.href = '/error';
      throw new Error('ServerError');
  }
  if (response.status >= 400 && response.status <= 501) {
    return Promise.reject(error);
  }
  return Promise.reject(error);
}
export function requestHandler(config) {
  return config;
}
export function requestErrorHandler(error) {
  return Promise.reject(error);
}

axios.interceptors.request.use(requestHandler, requestErrorHandler);
axios.interceptors.response.use(responseHandler, responseErrorHandler);

const defaultConfig = {
  baseURL: 'zeus',
};
export const ZeusHttpIns = axios.create(defaultConfig);
// 如果需要在vue实例里使用 this.$http.get('/user') 这种
// 就在main.js里执行 Vue.use(Http); 一般直接用HttpIns就行了，需要设置自己的baseURL
export default {
  install(Vue, options = {}) {
    Object.assign(defaultConfig, options);
    const VueAlias = Vue;
    const HttpIns = axios.create(defaultConfig);

    VueAlias.http = HttpIns;
    VueAlias.prototype.$http = HttpIns;
  },
};
