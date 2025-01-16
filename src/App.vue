<template>
  <div>
    <h1>Boîte Musicale</h1>
    <p>Ajoutez des liens audio ou téléchargez des fichiers MP3 pour les écouter !</p>

    <!-- Formulaire pour ajouter des liens audio -->
    <div>
      <h2>Ajouter un lien</h2>
      <form @submit.prevent="addAudio">
        <input 
          type="text" 
          v-model="newAudioUrl" 
          placeholder="Entrez un lien audio (ex: https://example.com/audio.mp3)" 
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <!-- Télécharger un fichier MP3 -->
    <div>
      <h2>Ou téléchargez un fichier MP3</h2>
      <input type="file" @change="uploadFile" accept="audio/mpeg" />
    </div>

    <!-- Liste des titres -->
    <div>
      <h2>Liste de lecture</h2>
      <ul>
        <li v-for="(audio, index) in playlist" :key="index">
          <span>{{ audio.name }}</span>
          <button @click="playAudio(index)">Lire</button>
          <button @click="removeAudio(index)">Supprimer</button>
        </li>
      </ul>
    </div>

    <!-- Contrôles de lecture -->
    <div v-if="currentAudioIndex !== null">
      <h2>Lecture</h2>
      <div>
        <p>{{ playlist[currentAudioIndex].name }}</p>
        <button @click="togglePlayPause">{{ isPlaying ? 'Pause' : 'Lecture' }}</button>
        <input 
          type="range" 
          :max="audioDuration" 
          v-model="currentTime" 
          @input="seekAudio" 
        />
      </div>

      <div>
        <label>Mode :</label>
        <select v-model="repeatMode">
          <option value="none">Aucun</option>
          <option value="track">Répéter Titre</option>
          <option value="list">Répéter Liste</option>
        </select>
      </div>
    </div>

    <!-- Lecteur audio (invisible) -->
    <audio 
      ref="audio" 
      @timeupdate="updateAudioProgress" 
      @ended="onAudioEnd" 
      hidden
    >
      <source :src="currentAudioUrl" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newAudioUrl: '', // URL ajoutée par l'utilisateur
      playlist: [], // Liste des titres (liens et fichiers)
      currentAudioIndex: null, // Index de l'audio en cours de lecture
      isPlaying: false, // État de lecture (lecture ou pause)
      currentTime: 0, // Temps actuel (en secondes)
      audioDuration: 0, // Durée totale de la piste
      repeatMode: 'none', // Mode de répétition : aucun, titre ou liste
    };
  },
  computed: {
    currentAudioUrl() {
      return this.currentAudioIndex !== null ? this.playlist[this.currentAudioIndex].src : null;
    },
  },
  methods: {
    // Ajouter un lien audio
    addAudio() {
      if (this.newAudioUrl.trim() && !this.playlist.find(audio => audio.src === this.newAudioUrl)) {
        this.playlist.push({ name: this.newAudioUrl, src: this.newAudioUrl, type: 'url' });
        this.newAudioUrl = '';
      }
    },

    // Télécharger et ajouter un fichier MP3
    uploadFile(event) {
      const file = event.target.files[0];
      if (file && file.type === 'audio/mpeg') {
        const fileUrl = URL.createObjectURL(file);
        this.playlist.push({ name: file.name, src: fileUrl, type: 'file' });
      }
    },

    // Jouer un audio
    playAudio(index) {
      this.currentAudioIndex = index;
      this.isPlaying = true;
      this.$refs.audio.load();
      this.$refs.audio.play();
    },

    // Basculer lecture/pause
    togglePlayPause() {
      const audio = this.$refs.audio;
      this.isPlaying ? audio.pause() : audio.play();
      this.isPlaying = !this.isPlaying;
    },

    // Mettre à jour la progression
    updateAudioProgress() {
      const audio = this.$refs.audio;
      this.currentTime = audio.currentTime;
      this.audioDuration = audio.duration;
    },

    // Avancer/reculer dans la piste
    seekAudio() {
      this.$refs.audio.currentTime = this.currentTime;
    },

    // Gérer la fin de la piste
    onAudioEnd() {
      if (this.repeatMode === 'track') {
        this.$refs.audio.play();
      } else if (this.repeatMode === 'list') {
        const nextIndex = (this.currentAudioIndex + 1) % this.playlist.length;
        this.playAudio(nextIndex);
      } else {
        this.isPlaying = false;
      }
    },

    // Supprimer un audio
    removeAudio(index) {
      const wasPlaying = index === this.currentAudioIndex;
      this.playlist.splice(index, 1);
      if (wasPlaying) {
        this.isPlaying = false;
        this.currentAudioIndex = null;
        this.$refs.audio.pause();
      }
    },
  },
};
</script>
