// filepath: /c:/Users/PC/Javascript jukebox/3a-isi1-24-25-tp-jukebox-guesmirazi/src/components/Playlist.vue
<template>
  <div>
    <ul class="list-group">
      <li v-for="(audio, index) in playlist" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
        <span>{{ audio.name }}</span>
        <div>
          <button class="btn btn-secondary btn-sm mr-2" @click="$emit('play-audio', index)">Lire</button>
          <button class="btn btn-danger btn-sm" @click="$emit('remove-audio', index)">Supprimer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Array,
      required: true
    }
  }
};
</script>