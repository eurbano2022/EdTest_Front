import App from './App.vue'
import { createApp } from 'vue'
import * as VueRouter from 'vue-router';
import { registerPlugins } from '@/plugins'
import { BackendRequest } from '@/plugins/backend_request'

import Index from '@/components/page/Index.vue'
import Contact from '@/components/page/Contact.vue'
import Register from '@/components/page/Register.vue'
import Quest from '@/components/page/Quest.vue'
import Inform from '@/components/page/Inform.vue'
import Consultation from '@/components/page/Consultation.vue'
import Us from '@/components/page/Us.vue'
import Roadmap from '@/components/page/Roadmap.vue'



const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/us',
        name: 'us',
        component: Us
    },
    {
        path: '/review_assessment',
        name: 'consultation',
        component: Consultation
    },
    {
        path: '/quest/:token_user',
        name: 'quest',
        props: true,
        component: Quest
    },
    {
        path: '/inform/:token_user',
        name: 'inform',
        props: true,
        component: Inform
    },
    {
        path: '/roadmap/:token_user',
        name: 'roadmap',
        props: true,
        component: Roadmap
    },
    ]
})

const app = createApp(App)
            .use(router)

app.config.globalProperties.$backendRequest = new BackendRequest('Bearer Mq1qff01l07HTQutc26h7yJmqph5XA7TE5Lc36x1u7')
registerPlugins(app)
app.mount('#app')
