import { createWebHistory, createRouter } from "vue-router";

import { useUserStore } from "../stores/user.store";

import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import ServersMonitor from "../views/ServersMonitor.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Server from "../views/Server.vue";


const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: NotFound
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    {
        path: "/servers-monitor",
        name: "ServersMonitor",
        component: ServersMonitor
    },
    {
        path: "/users/:userID",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth: true,
            userID: 'me'
        },
        beforeRouteEnter(to, from, next) {
            console.log("asdasdas")
            const userStore = useUserStore();
            if (to.meta?.userID === userStore.data?.id) {
                next({ name: 'Profile' });
            }
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            toRoute: { name: 'Profile' }
        },
        beforeRouteEnter(to, from, next) {
            const userStore = useUserStore();
            if (userStore.isLoggedIn) {
                next({ name: 'Profile' });
            }
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/servers/:serverID",
        name: "Server",
        component: Server,
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
