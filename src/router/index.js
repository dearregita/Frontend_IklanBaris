import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import Iklansaya from '../views/Iklansaya.vue'
import Profile from '../views/Profile.vue'
import Item from '../views/item.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {default: Home, header: Navbar, footer: Footer},
    },
  {
    path: '/register',
    name: 'register',
    components: {default: Register, header: Navbar},
    },
  {
    path: '/login',
    name: 'login',
    components: {default: Login, header: Navbar},
  },
    {
    path: '/detail',
    name: 'detail',
    components: {default: Detail, header: Navbar, footer: Footer},
  },
  {
    path: '/iklansaya',
    name: 'iklansaya',
    components: {default: Iklansaya, header: Navbar, footer: Footer},
},
  {
    path: '/profile',
    name: 'profile',
    components: {default: Profile, header: Navbar, footer: Footer},
  },
  {
    path: '/item',
    name: 'item',
    components: {default: Item},
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
