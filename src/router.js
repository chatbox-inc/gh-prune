// Base dependencies
import Vue from 'vue'
import { IonicVueRouter } from '@modus/ionic-vue'
import Home from '@/views/Home.vue'
import store from '@/store.js'

// Enable the ionic-vue router plugin
Vue.use(IonicVueRouter)

// Create a new IonicVueRouter instance
// Define and export our routes
const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        component: Home,
        meta: { guestAccessible: true }
    },
    {
      path: '/repos',
      component: () => import('@/views/Repos.vue')
    },
    {
      path: '/repos/:owner/:repos',
      component: () => import('@/views/RepoDetail.vue')
    },
    { path: '*', redirect: { name: '/' }}
  ],
})

router.beforeEach(async (to, from, next) => {
    await store.dispatch("reLogin")
    if (
        to.meta.guestAccessible !== true &&
        store.state.user === null
    ) {
        next({
            path: '/',
            query: {
                authError: true
            }
        })
    }else if (
        to.meta.guestAccessible === true &&
        store.state.user !== null
    ) {
        next({
            path: '/repos',
        })
    }else{
      next()
    }
})

export default router