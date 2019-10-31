import { userState } from '../store/userinfo.module';
/* import { accountset } from '../store/accountset.module'; */

//返回当前登入用户信息
export function getLoginUserInfo() {
    if (userState.state.user) {
        return userState.state.user
    } else {
        return null;
    }
}