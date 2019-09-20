import Cookie from 'js-cookie';
import { ZeusHttpIns } from '../common/Http';

export default class User {
  static getUserInfo() {
    return ZeusHttpIns.get('/user');
  }

  static login(params = {}) {
    // 假装我在登录，实际应该调用接口登录
    Cookie.set('login_status', JSON.stringify(params));
    return Promise.resolve(true);
    /* return ZeusHttpIns.post('/login', params).then((data) => {
      Cookie.set('login_user', JSON.stringify(params));
      return data;
    }); */
  }

  static logout() {
    return ZeusHttpIns.post('/logout');
  }
}
