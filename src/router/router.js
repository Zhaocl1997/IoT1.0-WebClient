import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/headerbar.vue';
import Footer from '../components/footerbar.vue';

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            components: {
                header: Header,
                footer: Footer
            }
        },
        {
            path: '/',
            component: resolve => require(['@/views/home.vue'], resolve),
            meta: {
                title: '主页'
            },
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/views/login/login.vue'], resolve),
            meta: {
                title: '登陆'
            },
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['@/views/login/register.vue'], resolve),
            meta: {
                title: '注册'
            },
        },
        {
            path: '/device',
            name: 'device',
            component: resolve => require(['@/views/device/device.vue'], resolve),
            meta: {
                title: '设备'
            },
        },
        {
            path: '/add-device',
            name: 'add-device',
            component: resolve => require(['@/views/device/add-device.vue'], resolve),
            meta: {
                title: '添加设备'
            },
        },
        {
            path: '/view-device',
            name: 'view-device',
            component: resolve => require(['@/views/device/view-device.vue'], resolve),
            meta: {
                title: '查看设备'
            },
        },
        {
            path: '/update-device',
            name: 'update-device',
            component: resolve => require(['@/views/device/update-device.vue'], resolve),
            meta: {
                title: '更新设备'
            },
        },
        {
            path: '*',
            name: '404',
            component: resolve => require(['@/views/404.vue'], resolve),
            meta: {
                title: '未知地址'
            }
        },
    ]
})