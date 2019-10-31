import axios from '../function/axioshttp'
import { local } from '../function/local'

/**
* 注册
* @param item 注册信息
*/
async function register(item) {
  const url = '/api/v1/users/register'
  const result = await axios.post(url, item);
  console.log(result)
  return result
}


/**
* 登录
* @param item 登录信息
*/
async function login(item) {
  const url = '/auth/local'
  const result = await axios.post(url, item)

  if (result.status === true) {
    const user = {
      id: result.data.userID,
      token: result.data.token
    }

    const userstate = {
      id: user.id,
      token: user.token,
      status: "login"
    }

    local.saveLocal('userinfo', userstate);

    return user
  } else if (result.status === false) {
    return result
  }
}


// 登出
function logout() {
  localStorage.clear();
}


export const userService = {
  register,
  login,
  logout
}