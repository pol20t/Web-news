// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '../views/AppHome.vue';
import HomeView from '../views/HomeView.vue';
import Contact from '../views/Contact.vue';
import CategoryPage from '../views/CategoryPage.vue';

const routes = [
  { path: '/', name: 'AppHome', component: AppHome },
  { path: '/', name: 'Home', component: HomeView },
  { path: '/category/:id', name: 'category', component: CategoryPage },
  { path: '/contact', name: 'Contact', component: Contact },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

