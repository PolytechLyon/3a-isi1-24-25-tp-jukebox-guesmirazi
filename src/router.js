// filepath: /c:/Users/PC/Javascript jukebox/3a-isi1-24-25-tp-jukebox-guesmirazi/src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from './components/MainPage.vue';
import ManagePlaylists from './components/ManagePlaylists.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/manage-playlists', component: ManagePlaylists }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;