import { createApp } from 'vue'; // Importation de la fonction pour créer une application Vue
import App from './App.vue'; // Importation du composant racine App
import router from './router'; // Importation de la configuration du routeur Vue

// Création de l'application Vue, ajout du routeur et montage sur l'élément avec l'ID #app
createApp(App)
  .use(router) // Intégration de Vue Router pour la gestion des routes
  .mount('#app'); // Attache l'application Vue au DOM, à l'élément avec l'ID "app"
