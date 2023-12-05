import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'home',
    component: () => import('../views/FuckUp.vue'),
    children: [
      {
        path: '/',
        redirect: "home"
      },
      {
        path: '/home',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/about',
        name: 'about',

        component: () => import('../views/AboutView.vue')
      }
    ]
  },
  {
    path: '/fuckordinary',
    name: 'fuckordinary',
    component: () => import('../views/FuckordinaryView.vue')
  },
  {
    path: '/inputer',
    name: '/inputer',
    component: () => import('../views/inputer.vue')
  },
  {
    path: '/fuckmanager',
    name: 'fuckmanager',
    component: () => import('../views/Fuckmanager.vue'),
    children: [
      {
        path: '',
        redirect: "tabel"
      },
      {
        path: "tabel",
        name: "tabel",
        component: () => import("../views/tabel.vue")
      },


    ]
  },


]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
