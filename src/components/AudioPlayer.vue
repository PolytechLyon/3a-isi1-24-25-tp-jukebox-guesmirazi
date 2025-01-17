<template>
  <div v-if="currentAudio">
    <!-- Audio player sans l'attribut 'controls' -->
    <audio ref="audioPlayer" :src="currentAudio.src" @ended="onAudioEnded" @timeupdate="updateTime" autoplay></audio>

    <!-- Affichage de la durée totale et du temps actuel -->
    <div class="audio-info">
      <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
    </div>

    <!-- Contrôles personnalisés -->
    <div class="audio-controls">
      <button @click="playPauseAudio">{{ isPlaying ? 'Pause' : 'Play' }}</button>
      <button @click="stopAudio">Stop</button>

      <!-- Contrôle de la position de lecture -->
      <div>
        <input type="range" min="0" :max="duration" v-model="currentTime" @input="seekAudio" />
        <div class="range-value">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
      </div>
      
      <!-- Contrôle du volume -->
      <div>
        <input type="range" min="0" max="100" v-model="volume" @input="changeVolume" />
        <div class="range-value">{{ volume }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Array,
      required: true
    },
    currentAudioIndex: {
      type: Number,
      required: true
    },
    repeatMode: {
      type: String,
      required: true,
      default: 'none'
    }
  },
  data() {
    return {
      isPlaying: false,
      volume: 100,
      currentTime: 0,
      duration: 0
    };
  },
  computed: {
    currentAudio() {
      return this.playlist[this.currentAudioIndex];
    }
  },
  methods: {
    playPauseAudio() {
      const audio = this.$refs.audioPlayer;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    stopAudio() {
      const audio = this.$refs.audioPlayer;
      audio.pause();
      audio.currentTime = 0;
      this.isPlaying = false;
    },
    updateTime() {
      const audio = this.$refs.audioPlayer;
      this.currentTime = audio.currentTime;
      this.duration = audio.duration;
    },
    seekAudio() {
      const audio = this.$refs.audioPlayer;
      audio.currentTime = this.currentTime;
    },
    changeVolume() {
      const audio = this.$refs.audioPlayer;
      audio.volume = this.volume / 100;
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    },
    onAudioEnded() {
      if (this.repeatMode === 'track') {
        // Répéter le même titre
        this.$refs.audioPlayer.currentTime = 0;
        this.$refs.audioPlayer.play();
        this.isPlaying = true;
      } else if (this.repeatMode === 'list') {
        // Passer au titre suivant ou répéter la liste
        const nextIndex = (this.currentAudioIndex + 1) % this.playlist.length;
        this.$emit('play-audio', nextIndex);
      } else {
        // Aucun mode de répétition
        this.isPlaying = false;
      }
    }
  }
};
</script>

<style scoped>
.audio-info {
  margin-bottom: 10px;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
}

.audio-controls div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.audio-controls input[type="range"] {
  width: 200px;
}

.range-value {
  font-size: 14px;
  margin-top: 5px;
}
</style>