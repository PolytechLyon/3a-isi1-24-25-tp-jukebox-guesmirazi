// filepath: /c:/Users/PC/Javascript jukebox/3a-isi1-24-25-tp-jukebox-guesmirazi/src/components/MainPage.vue
<template>
  <div>
    <h1>Boîte Musicale</h1>
    <button @click="$router.push('/manage-playlists')">Gérer les listes de lecture</button>
    <p>Ajoutez des liens audio ou téléchargez des fichiers MP3 pour les écouter !</p>

    <AudioForm @add-audio="addAudio" @upload-file="uploadFile" />
    <Playlist :playlist="currentPlaylist.tracks" @play-audio="playAudio" @remove-audio="removeAudio" />
    <AudioPlayer 
      :playlist="currentPlaylist.tracks" 
      :currentAudioIndex="currentAudioIndex" 
      @play-audio="playAudio" 
    />
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
      currentAudioIndex: null
    };
  },
  computed: {
    currentPlaylist() {
      return this.playlists[this.selectedPlaylistIndex] || { name: '', tracks: [] };
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