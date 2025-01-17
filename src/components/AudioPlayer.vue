<template>
  <div v-if="currentAudio">
    <!-- Lecteur audio pour lire le titre actuel -->
    <audio 
      ref="audioPlayer" 
      :src="currentAudio.src" 
      controls 
      autoplay 
      @ended="onAudioEnded"
    ></audio>
  </div>
</template>

<script>
export default {
  props: {
    // Liste des titres de la playlist, reçue du composant parent
    playlist: {
      type: Array,
      required: true
    },
    // Index du titre actuellement en lecture dans la playlist
    currentAudioIndex: {
      type: Number,
      required: true
    },
    // Mode de répétition : peut être "list", "track", ou aucun
    repeatMode: {
      type: String,
      required: true
    }
  },
  computed: {
    // Récupère les informations du titre en cours de lecture
    currentAudio() {
      return this.playlist[this.currentAudioIndex];
    }
  },
  methods: {
    // Méthode appelée lorsque la lecture d'un audio est terminée
    onAudioEnded() {
      if (this.repeatMode === 'track') {
        // Si le mode de répétition est "track", rejoue le même titre
        this.$refs.audioPlayer.currentTime = 0;
        this.$refs.audioPlayer.play();
      } else if (this.repeatMode === 'list') {
        // Si le mode de répétition est "list", passe au titre suivant
        // ou retourne au début si c'est la fin de la liste
        const nextIndex = (this.currentAudioIndex + 1) % this.playlist.length;
        // Émet un événement pour signaler le changement de titre
        this.$emit('play-audio', nextIndex);
      }
      // Si le mode de répétition est "none", aucune action n'est prise.
    }
  }
};
</script>
