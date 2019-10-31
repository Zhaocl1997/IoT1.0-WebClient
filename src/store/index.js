import Vue from 'vue';
import Vuex from 'vuex';
import { userState } from './userinfo.module'
import { deviceState } from './deviceinfo.module'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        userState,
        deviceState
    }
});