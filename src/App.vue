<template>
  <div>
    <h1>Boîte Musicale</h1>
    <p>Ajoutez des liens audio ou téléchargez des fichiers MP3 pour les écouter !</p>

    <AudioForm @add-audio="addAudio" @upload-file="uploadFile" />
    <Playlist :playlist="playlist" @play-audio="playAudio" @remove-audio="removeAudio" />
    <AudioPlayer 
      :playlist="playlist" 
      :currentAudioIndex="currentAudioIndex" 
      @play-audio="playAudio" 
    />
  </div>
</template>

<script>
import AudioForm from './components/AudioForm.vue';
import Playlist from './components/Playlist.vue';
import AudioPlayer from './components/AudioPlayer.vue';

export default {
  components: {
    AudioForm,
    Playlist,
    AudioPlayer
  },
  data() {
    return {
      playlist: [],
      currentAudioIndex: null
    };
  },
  created() {
    this.loadPlaylist();
  },
  methods: {
    addAudio(url) {
      if (url.trim() && !this.playlist.find(audio => audio.src === url)) {
        const newAudio = { name: url, src: url, type: 'url' };
        this.playlist.push(newAudio);
        this.savePlaylist();
      }
    },
    uploadFile(file) {
      this.playlist.push(file);
    },
    playAudio(index) {
      this.currentAudioIndex = index;
    },
    removeAudio(index) {
      const wasPlaying = index === this.currentAudioIndex;
      this.playlist.splice(index, 1);
      if (wasPlaying) {
        this.currentAudioIndex = null;
      }
      this.savePlaylist();
    },
    savePlaylist() {
      const publicLinks = this.playlist.filter(audio => audio.type === 'url');
      localStorage.setItem('playlist', JSON.stringify(publicLinks));
    },
    loadPlaylist() {
      const savedPlaylist = localStorage.getItem('playlist');
      if (savedPlaylist) {
        this.playlist = JSON.parse(savedPlaylist);
      }
    }
  }
};
</script>