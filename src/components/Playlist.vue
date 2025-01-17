<template>
  <div>
    <!-- Liste des pistes audio -->
    <ul class="list-group">
      <!-- Itération sur chaque élément de la playlist -->
      <li 
        v-for="(audio, index) in playlist" 
        :key="index" 
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <!-- Affiche le nom de la piste -->
        <span>{{ audio.name }}</span>
        <div>
          <!-- Bouton pour lire la piste audio -->
          <button 
            class="btn btn-secondary btn-sm mr-2" 
            @click="$emit('play-audio', index)"
          >
            Lire
          </button>
          <!-- Bouton pour supprimer la piste audio -->
          <button 
            class="btn btn-danger btn-sm" 
            @click="$emit('remove-audio', index)"
          >
            Supprimer
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // La playlist est passée en tant que prop depuis le composant parent
    playlist: {
      type: Array,
      required: true
    }
  }
};
</script>
