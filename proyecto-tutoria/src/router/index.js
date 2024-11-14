import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Menu from '@/components/Menu.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('authToken');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router