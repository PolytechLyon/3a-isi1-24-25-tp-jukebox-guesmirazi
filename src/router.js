import { createRouter, createWebHistory } from 'vue-router'; 
// Importation des fonctions nécessaires pour configurer Vue Router


import MainPage from './components/MainPage.vue'; 
// Importation du composant pour la page principale.
import ManagePlaylists from './components/ManagePlaylists.vue'; 
// Importation du composant pour la gestion des playlists.

const routes = [
  { path: '/', component: MainPage }, 
  // Route pour la page principale. 
  // `path: '/'` signifie que cette page est accessible à l'URL racine.
  { path: '/manage-playlists', component: ManagePlaylists } 
  // Route pour la gestion des playlists. 
  // Accessible via `/manage-playlists`.
];

const router = createRouter({
  history: createWebHistory(), 
  // Configuration de l'historique du navigateur pour gérer la navigation. 
  // Cela permet des URL propres sans `#` (exemple : `/manage-playlists` au lieu de `/#/manage-playlists`).
  routes 
  // Tableau des routes définies, qui associe les chemins aux composants correspondants.
});

export default router; 
// Exportation de l'instance du routeur pour l'utiliser dans le fichier principal (généralement `main.js`).
