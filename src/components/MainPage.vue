<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="#">Projet Juxebox Guesmi Mohamed Amine et Razi Yassine</a>
    </nav>
    <div class="container">
      <h1 class="my-4">Boîte Musicale</h1>
      <button class="btn btn-primary mb-3" @click="$router.push('/manage-playlists')">Gérer les listes de lecture</button>
      <p>Ajoutez des liens audio ou téléchargez des fichiers MP3 pour les écouter !</p>
      <p v-if="selectedPlaylistName">Liste de lecture sélectionnée : {{ selectedPlaylistName }}</p>

      <!-- Sélecteur de mode de répétition -->
      <div class="mb-3">
        <label for="repeatMode">Mode de répétition :</label>
        <select id="repeatMode" v-model="repeatMode" class="form-control">
          <option value="none">Aucun</option>
          <option value="track">Titre</option>
          <option value="list">Liste</option>
        </select>
      </div>

      <AudioForm @add-audio="addAudio" @upload-file="uploadFile" />
      <Playlist :playlist="currentPlaylist.tracks" @play-audio="playAudio" @remove-audio="removeAudio" />
      <AudioPlayer 
        :playlist="currentPlaylist.tracks" 
        :currentAudioIndex="currentAudioIndex" 
        :repeatMode="repeatMode"
        @play-audio="playAudio" 
      />
    </div>
  </div>
</template>

<script>
import AudioForm from './AudioForm.vue';
import Playlist from './Playlist.vue';
import AudioPlayer from './AudioPlayer.vue';

export default {
  components: {
    AudioForm,
    Playlist,
    AudioPlayer
  },
  data() {
    return {
      playlists: JSON.parse(localStorage.getItem('playlists')) || [],
      selectedPlaylistIndex: JSON.parse(localStorage.getItem('selectedPlaylistIndex')) || 0,
      currentAudioIndex: null,
      repeatMode: 'none' // Mode de répétition par défaut
    };
  },
  computed: {
    currentPlaylist() {
      return this.playlists[this.selectedPlaylistIndex] || { name: '', tracks: [] };
    },
    selectedPlaylistName() {
      return this.currentPlaylist.name;
    }
  },
  created() {
    this.loadPlaylist();
  },
  methods: {
    addAudio(url) {
      if (url.trim() && !this.currentPlaylist.tracks.find(audio => audio.src === url)) {
        const newAudio = { name: url, src: url, type: 'url' };
        this.currentPlaylist.tracks.push(newAudio);
        this.savePlaylist();
      }
    },
    uploadFile(file) {
      this.currentPlaylist.tracks.push(file);
      this.savePlaylist();
    },
    playAudio(index) {
      this.currentAudioIndex = index;
    },
    removeAudio(index) {
      const wasPlaying = index === this.currentAudioIndex;
      this.currentPlaylist.tracks.splice(index, 1);
      if (wasPlaying) {
        this.currentAudioIndex = null;
      }
      this.savePlaylist();
    },
    savePlaylist() {
      this.playlists[this.selectedPlaylistIndex] = this.currentPlaylist;
      localStorage.setItem('playlists', JSON.stringify(this.playlists));
    },
    loadPlaylist() {
      const savedPlaylists = localStorage.getItem('playlists');
      if (savedPlaylists) {
        this.playlists = JSON.parse(savedPlaylists);
      }
    }
  }
};
</script>