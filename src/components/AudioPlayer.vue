// filepath: /c:/Users/PC/Javascript jukebox/3a-isi1-24-25-tp-jukebox-guesmirazi/src/components/AudioPlayer.vue
<template>
  <div v-if="currentAudio">
    <audio :src="currentAudio.src" controls autoplay></audio>
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
    }
  },
  computed: {
    currentAudio() {
      return this.playlist[this.currentAudioIndex];
    }
  }
};
</script>