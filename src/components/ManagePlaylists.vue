// filepath: /c:/Users/PC/Javascript jukebox/3a-isi1-24-25-tp-jukebox-guesmirazi/src/components/ManagePlaylists.vue
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="#">Projet Juxebox Guesmi Mohamed Amine et Razi Yassine</a>
    </nav>
    <div class="container">
      <h1 class="my-4">Gérer les listes de lecture</h1>
      <form @submit.prevent="createPlaylist" class="mb-4">
        <div class="input-group">
          <input v-model="newPlaylistName" class="form-control" placeholder="Nom de la nouvelle liste de lecture" />
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Créer</button>
          </div>
        </div>
      </form>
      <ul class="list-group">
        <li v-for="(playlist, index) in playlists" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ playlist.name }} ({{ playlist.tracks.length }} titres)</span>
          <div>
            <button class="btn btn-secondary btn-sm mr-2" @click="selectPlaylist(index)">Sélectionner</button>
            <button class="btn btn-danger btn-sm" @click="deletePlaylist(index)" :disabled="index === selectedPlaylistIndex">Supprimer</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlists: JSON.parse(localStorage.getItem('playlists')) || [],
      newPlaylistName: '',
      selectedPlaylistIndex: JSON.parse(localStorage.getItem('selectedPlaylistIndex')) || 0
    };
  },
  methods: {
    createPlaylist() {
      if (this.newPlaylistName.trim()) {
        this.playlists.push({ name: this.newPlaylistName, tracks: [] });
        this.newPlaylistName = '';
        this.savePlaylists();
      }
    },
    selectPlaylist(index) {
      this.selectedPlaylistIndex = index;
      this.saveSelectedPlaylistIndex();
      this.$router.push('/');
    },
    deletePlaylist(index) {
      this.playlists.splice(index, 1);
      if (index === this.selectedPlaylistIndex) {
        this.selectedPlaylistIndex = 0;
      }
      this.savePlaylists();
      this.saveSelectedPlaylistIndex();
    },
    savePlaylists() {
      localStorage.setItem('playlists', JSON.stringify(this.playlists));
    },
    saveSelectedPlaylistIndex() {
      localStorage.setItem('selectedPlaylistIndex', JSON.stringify(this.selectedPlaylistIndex));
    }
  }
};
</script>