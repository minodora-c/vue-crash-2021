import {createRouter, createWebHistory} from "vue-router"
import Home from "../views/Home"
import About from "../views/About"
import Thirdssss from "../views/Test"

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/about',
        name: "About",
        component: About
    },
    {
        path: '/third',
        name: "Third",
        component: Thirdssss
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URK),
    routes
})

export default router;