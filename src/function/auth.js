import { local } from './local'
// import { store } from '../store'

export function authHeader() {
    // return authorization header with jwt token
    const result = local.loadLocal('userinfo')
    // console.log(store.state.userState.user.token)

    if (result && result.token) {
        return { 'Authorization': 'Bearer ' + result.token };
    } else {
        return {};
    }
}