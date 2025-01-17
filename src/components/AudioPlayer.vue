<template>
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
  props: {
    playlist: Array,
    currentAudioIndex: Number
  },
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      audioDuration: 0,
      repeatMode: 'none'
    };
  },
  computed: {
    currentAudioUrl() {
      return this.currentAudioIndex !== null ? this.playlist[this.currentAudioIndex].src : null;
    }
  },
  methods: {
    togglePlayPause() {
      const audio = this.$refs.audio;
      this.isPlaying ? audio.pause() : audio.play();
      this.isPlaying = !this.isPlaying;
    },
    updateAudioProgress() {
      const audio = this.$refs.audio;
      this.currentTime = audio.currentTime;
      this.audioDuration = audio.duration;
    },
    seekAudio() {
      this.$refs.audio.currentTime = this.currentTime;
    },
    onAudioEnd() {
      if (this.repeatMode === 'track') {
        this.$refs.audio.play();
      } else if (this.repeatMode === 'list') {
        const nextIndex = (this.currentAudioIndex + 1) % this.playlist.length;
        this.$emit('play-audio', nextIndex);
      } else {
        this.isPlaying = false;
      }
    }
  }
};
</script>