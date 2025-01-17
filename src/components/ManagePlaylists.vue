<template>
  <div>
    <!-- Navbar avec le titre du projet -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="#">Projet Juxebox Guesmi Mohamed Amine et Razi Yassine</a>
    </nav>
    
    <div class="container">
      <h1 class="my-4">Gérer les listes de lecture</h1>
      
      <!-- Formulaire pour créer une nouvelle liste de lecture -->
      <form @submit.prevent="createPlaylist" class="mb-4">
        <div class="input-group">
          <input v-model="newPlaylistName" class="form-control" placeholder="Nom de la nouvelle liste de lecture" />
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Créer</button>
          </div>
        </div>
      </form>
      
      <!-- Liste des playlists existantes -->
      <ul class="list-group mb-4">
        <li v-for="(playlist, index) in playlists" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ playlist.name }} ({{ playlist.tracks.length }} titres)</span>
          <div>
            <!-- Boutons pour sélectionner ou supprimer une playlist -->
            <button class="btn btn-secondary btn-sm mr-2" @click="selectPlaylist(index)">Sélectionner</button>
            <button class="btn btn-danger btn-sm" @click="deletePlaylist(index)" :disabled="index === selectedPlaylistIndex">Supprimer</button>
          </div>
        </li>
      </ul>
      
      <!-- Bouton pour revenir à la page d'accueil -->
      <button class="btn btn-secondary" @click="goToHomePage">Retour à l'accueil</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Récupération des playlists et de la playlist sélectionnée dans localStorage
      playlists: JSON.parse(localStorage.getItem('playlists')) || [],
      newPlaylistName: '', // Nom de la nouvelle playlist à créer
      selectedPlaylistIndex: JSON.parse(localStorage.getItem('selectedPlaylistIndex')) || 0 // Index de la playlist sélectionnée
    };
  },
  methods: {
    // Crée une nouvelle playlist et la sauvegarde dans localStorage
    createPlaylist() {
      if (this.newPlaylistName.trim()) {
        this.playlists.push({ name: this.newPlaylistName, tracks: [] });
        this.newPlaylistName = ''; // Réinitialiser le champ
        this.savePlaylists(); // Sauvegarde dans localStorage
      }
    },
    
    // Sélectionne une playlist et met à jour l'index sélectionné dans localStorage
    selectPlaylist(index) {
      this.selectedPlaylistIndex = index;
      this.saveSelectedPlaylistIndex(); // Sauvegarde l'index sélectionné
      this.$router.push('/'); // Redirige vers la page principale
    },
    
    // Supprime une playlist et met à jour la sélection si nécessaire
    deletePlaylist(index) {
      this.playlists.splice(index, 1);
      if (index === this.selectedPlaylistIndex) {
        this.selectedPlaylistIndex = 0; // Réinitialise l'index si la playlist supprimée était sélectionnée
      }
      this.savePlaylists(); // Sauvegarde dans localStorage
      this.saveSelectedPlaylistIndex(); // Sauvegarde de l'index de la playlist sélectionnée
    },
    
    // Sauvegarde les playlists dans localStorage
    savePlaylists() {
      localStorage.setItem('playlists', JSON.stringify(this.playlists));
    },
    
    // Sauvegarde l'index de la playlist sélectionnée dans localStorage
    saveSelectedPlaylistIndex() {
      localStorage.setItem('selectedPlaylistIndex', JSON.stringify(this.selectedPlaylistIndex));
    },
    
    // Redirige l'utilisateur vers la page d'accueil
    goToHomePage() {
      this.$router.push('/');
    }
  }
};
</script>
