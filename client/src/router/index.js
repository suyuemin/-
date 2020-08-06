import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'
import Blog from '../views/Blog.vue'
import BlogDetail from '../components/BlogDetail'
import Video from '../views/Video.vue'
import Resource from '../views/Resource.vue'
import User from '../views/User.vue'
import Book from '../views/Book.vue'
import Chapter from '../components/Chapter'
import Section from '../components/Section'
import SectionDetail from '../components/SectionDetail'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: '',
        component: Layout,
        children: [{
                path: '/',
                name: '',
                component: Home
            },
            {
                path: '/book',
                name: '',
                component: Book
            },
            {
                path: '/chapter',
                name: '',
                component: Chapter
            },
            {
                path: '/section',
                name: '',
                component: Section
            },
            {
                path: '/createSection',
                name: '',
                component: SectionDetail
            },
            {
                path: '/section/:id',
                name: '',
                component: SectionDetail
            },
            {
                path: '/blog',
                name: '',
                component: Blog
            },
            {
                path: '/createBlog',
                name: '',
                component: BlogDetail
            },
            {
                path: '/blog/:id',
                name: '',
                component: BlogDetail
            },
            {
                path: '/video',
                name: '',
                component: Video
            },
            {
                path: '/resource',
                name: '',
                component: Resource
            },
            {
                path: '/user',
                name: '',
                component: User
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }

]

const router = new VueRouter({
    // mode: 'history',

    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next();
    } else {
        if (localStorage.getItem("token")) {
            next();
        } else {
            next("/login")
        }
    }
})

//防止element-ui路由跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router