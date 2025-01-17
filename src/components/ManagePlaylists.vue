// filepath: /c:/Users/PC/Javascript jukebox/3a-isi1-24-25-tp-jukebox-guesmirazi/src/components/ManagePlaylists.vue
<template>
  <div>
    <h1>Gérer les listes de lecture</h1>
    <form @submit.prevent="createPlaylist">
      <input v-model="newPlaylistName" placeholder="Nom de la nouvelle liste de lecture" />
      <button type="submit">Créer</button>
    </form>
    <ul>
      <li v-for="(playlist, index) in playlists" :key="index">
        <span>{{ playlist.name }} ({{ playlist.tracks.length }} titres)</span>
        <button @click="selectPlaylist(index)">Sélectionner</button>
        <button @click="deletePlaylist(index)" :disabled="index === selectedPlaylistIndex">Supprimer</button>
      </li>
    </ul>
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