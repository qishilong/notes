import { createRouter, createWebHistory } from "vue-router";
import Recommend from '../components/Recommend.vue';
import Trailer from '../components/Trailer.vue';
import Interpretation from '../components/Interpretation.vue';
import Commentary from '../components/Commentary.vue';
import Entertainment from '../components/Entertainment.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/video',
            component: Recommend,
        },
        {
            path: '/video/trailer',
            component: Trailer,
        },
        {
            path: '/video/interpretation',
            component: Interpretation,
        },
        {
            path: '/video/commentary',
            component: Commentary,
        },
        {
            path: '/video/entertainment',
            component: Entertainment,
        }
    ]
})
export default router;