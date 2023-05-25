import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import LoginView from '../views/Login.vue';
import RegisterView from '../views/Register.vue';
import CarDetailsView from '../views/CarDetailView.vue';
import NotFound from '../views/NotFound.vue';
const websiteName = 'Carpedia';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: `Home | ${websiteName}`,
            isAuthenticationRequired: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            title: `Login | ${websiteName}`,
            guest: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: {
            title: `Register | ${websiteName}`,
            guest: true,
        },
    },
    {
        path: '/details/:id',
        name: 'carDetailsById',
        component: CarDetailsView,
        meta: {
            title: `Car | ${websiteName}`,
            isAuthenticationRequired: true,
        },
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
    },
];

const Router = createRouter({
    history: createWebHistory('/'),
    routes,
});

Router.beforeEach((to, from, next) => {
    if (to.meta.isAuthenticationRequired) {
        if (sessionStorage.getItem('token')) {
            next();
        } else {
            alert('Please Login/Register to continue!');
            next('/login');
        }
    }
    if (to.meta.guest) {
        if (sessionStorage.getItem('token')) {
            next('/');
        }
    }

    next();
});

Router.afterEach((to, from) => {
    const title = to.meta.title;
    if (title) {
        document.title = title;
    }
});

export default Router;
