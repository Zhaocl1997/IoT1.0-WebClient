import { userService } from '../api/user';
import { router } from '../router/router';
import { local } from "../function/local";

const user = local.loadLocal('userinfo')

let state = user
    ? { status: "login", user }
    : { status: "logout", user: null };


// const getters = {
//     getUserInfo: state => {
//         if (state.user) {
//             return state.user
//         } else {
//             return null
//         }
//     },
// };

const actions = {
    //登录
    async login({ commit }, item) {
        const result = await userService.login(item)

        if (result.token) {
            alert('登陆成功')
            router.push('/device')
            commit('loginSuccess', result);
        } else {
            alert('登陆失败')
            commit('loginFailure', result);
        }
    },

    // 登出
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },

    //注册
    async regist({ commit }, item) {
        const result = await userService.register(item)

        if (result.data.token) {
            alert("注册成功");
            router.push('/');
        } else {
            alert("信息不合法！")
        }
    },

    //更新 
    // async update({ commit, dispatch }, user) {

    //     commit('updateprofile', user);
    //     const data = await loginService.update(user)

    //     if (data.status === 'error') {
    //         commit('updateFailure', data.message)
    //         dispatch('alert/error', data.message, { root: true });
    //     }

    //     if (data.status === 'success') {
    //         //let user = data
    //         dispatch('alert/success', data.message, { root: true });
    //     }
    // },
};

const mutations = {

    loginSuccess(state, user) {
        state.status = "login"
        state.user = user;
    },

    loginFailure(state) {
        state.status = "loginFailure"
        state.user = null;
    },

    logout(state) {
        state.status = "logout"
        state.user = null;
    },

    updateSuccess(state, user) {
        state.user = user;
    },
    updateprofile(state, user) {

        state.user = user;
    },
    updateFailure(state) {
        state.status = { update: false };

    },
};

export const userState = {
    namespaced: true,
    state,
    actions,
    mutations,
    // getters
};