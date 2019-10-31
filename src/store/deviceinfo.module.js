import { deviceService } from '../api/device';
import { router } from '../router/router';
import { local } from "../function/local";

let state = {
    device: []
}

const actions = {
    async index({ commit }, item) {
        const result = await deviceService.index(item)

        if (result.status === true) {
            commit('deviceinfo', result.data)
            return result.data
        }
    }
}

const mutations = {
    deviceinfo(state, device) {
        state.device = device
    }
}

export const deviceState = {
    namespaced: true,
    state,
    actions,
    mutations,
};