import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
import CarDetailsView from '../views/CarDetailsView.vue'

const websiteName = 'Carpedia'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: `Home | ${websiteName}`
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: `Login | ${websiteName}`
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: `Register | ${websiteName}`
    }
  },
  {
    path: '/details/:id',
    name: 'carDetailsById',
    component: CarDetailsView,
    meta: {
      title: `Car | ${websiteName}`
    }
  }
]

const Router = createRouter({
  history: createWebHistory('/'),
  routes
})

Router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default Router
