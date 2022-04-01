import { createWebHistory, createRouter } from 'vue-router';

import { useUserStore } from '../stores/user.store';

import NotFound from '../views/NotFound.vue';
import Home from '../views/Home.vue';
import Docs from '../views/Docs.vue';
import ServersMonitor from '../views/ServersMonitor.vue';
import User from '../views/User.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Server from '../views/Server.vue';
import UserSettings from "../components/user/UserSettings.vue";
import UserOverview from "../components/user/UserOverview.vue";


const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/docs',
        name: 'Docs',
        component: Docs
    },
    {
        path: '/servers-monitor',
        name: 'ServersMonitor',
        component: ServersMonitor
    },
    {
        path: '/users/:id',
        name: 'User',
        component: User,
        props: true,
        meta: { requiresAuth: true },
        children: [{
            path: '',
            name: 'UserOverview',
            props: true,
            component: UserOverview,
        },
        {
            path: 'settings',
            name: 'UserSettings',
            props: true,
            component: UserSettings,
            meta: { requiresAuth: true }
        }]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        props: true,
        beforeRouteEnter(to, from, next) {
            const userStore = useUserStore();
            if (userStore.isLoggedIn) {
                next({ name: 'User' });
            }
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/servers/:id',
        name: 'Server',
        component: Server,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const requiresAuth = to.meta?.requiresAuth;

    if (requiresAuth && !userStore.isLoggedIn) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
