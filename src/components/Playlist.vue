<template>
  <div>
    <h2>Liste de lecture</h2>
    <ul>
      <li v-for="(audio, index) in playlist" :key="index">
        <span>{{ audio.name }}</span>
        <button @click="$emit('play-audio', index)">Lire</button>
        <button @click="$emit('remove-audio', index)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    playlist: Array
  }
};
</script>