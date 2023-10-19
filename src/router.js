import { createRouter, createWebHistory } from 'vue-router';

import HomeComponent from './components/HomeComponent.vue';
import HeadlineDetail from './components/HeadlineDetail.vue';
import VisitedHeadline from './components/VisitedHeadline.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/headline-details/:type/:id', component: HeadlineDetail },
    { path: '/visited-headline', component: VisitedHeadline },
  ],
});
export default router;
