<template>
  <div>
    <!-- Barre de navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="#">Projet Juxebox Guesmi Mohamed Amine et Razi Yassine</a>
    </nav>
    <div class="container">
      <h1 class="my-4">Gérer les listes de lecture</h1>
      <!-- Formulaire pour créer une nouvelle playlist -->
      <form @submit.prevent="createPlaylist" class="mb-4">
        <div class="input-group">
          <input v-model="newPlaylistName" class="form-control" placeholder="Nom de la nouvelle liste de lecture" />
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Créer</button>
          </div>
        </div>
      </form>
      <!-- Liste des playlists -->
      <ul class="list-group mb-4">
        <li v-for="(playlist, index) in playlists" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ playlist.name }} ({{ playlist.tracks.length }} titres)</span>
          <div>
            <button class="btn btn-secondary btn-sm mr-2" @click="selectPlaylist(index)">Sélectionner</button>
            <button class="btn btn-danger btn-sm" @click="deletePlaylist(index)" :disabled="index === selectedPlaylistIndex">Supprimer</button>
          </div>
        </li>
      </ul>
      <!-- Bouton pour retourner à la page d'accueil -->
      <button class="btn btn-secondary" @click="goToHomePage">Retour à l'accueil</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlists: JSON.parse(localStorage.getItem('playlists')) || [], // Liste des playlists
      newPlaylistName: '', // Nom de la nouvelle playlist à créer
      selectedPlaylistIndex: JSON.parse(localStorage.getItem('selectedPlaylistIndex')) || 0 // Index de la playlist sélectionnée
    };
  },
  methods: {
    // Créer une nouvelle playlist
    createPlaylist() {
      console.log('Creating playlist:', this.newPlaylistName);
      if (this.newPlaylistName.trim()) {
        this.playlists.push({ name: this.newPlaylistName, tracks: [] });
        this.newPlaylistName = '';
        this.savePlaylists();
      }
    },
    // Sélectionner une playlist et naviguer vers la page d'accueil
    selectPlaylist(index) {
      console.log('Selecting playlist index:', index);
      this.selectedPlaylistIndex = index;
      this.saveSelectedPlaylistIndex();
      this.$router.push('/');
    },
    // Supprimer une playlist
    deletePlaylist(index) {
      console.log('Deleting playlist index:', index);
      this.playlists.splice(index, 1);
      if (index === this.selectedPlaylistIndex) {
        this.selectedPlaylistIndex = 0;
      }
      this.savePlaylists();
      this.saveSelectedPlaylistIndex();
    },
    // Enregistrer les playlists dans le localStorage
    savePlaylists() {
      console.log('Saving playlists:', this.playlists);
      localStorage.setItem('playlists', JSON.stringify(this.playlists));
    },
    // Enregistrer l'index de la playlist sélectionnée dans le localStorage
    saveSelectedPlaylistIndex() {
      console.log('Saving selected playlist index:', this.selectedPlaylistIndex);
      localStorage.setItem('selectedPlaylistIndex', JSON.stringify(this.selectedPlaylistIndex));
    },
    // Naviguer vers la page d'accueil
    goToHomePage() {
      console.log('Navigating to home page');
      this.$router.push('/');
    }
  }
};
</script>