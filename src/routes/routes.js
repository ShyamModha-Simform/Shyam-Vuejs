import { createRouter, createWebHistory } from 'vue-router';
const HomeView = () => import('../views/HomeView.vue');
const LoginView = () => import('../views/LoginView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const CarDetailView = () => import('../views/CarDetailView.vue');
const NotFound = () => import('../views/NotFoundView.vue');
const websiteName = 'Carpedia';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { title: `Home | ${websiteName}`, isAuthenticationRequired: true },
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
        component: CarDetailView,
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
    if (to.meta.isAuthenticationRequired && !sessionStorage.getItem('token')) {
        alert('Please Login/Register to continue!');
        return next('/login');
    }
    if (to.meta.guest && sessionStorage.getItem('token')) {
        return next('/');
    }
    return next();
});

Router.afterEach((to) => {
    const title = to.meta.title;
    if (title) {
        document.title = title;
    }
});

export default Router;
