<template>
  <div>
    <!-- Titre pour ajouter un lien -->
    <h2>Ajouter un lien</h2>
    <!-- Formulaire pour entrer un lien audio -->
    <form @submit.prevent="addAudio">
      <!-- Champ de saisie pour l'URL de l'audio -->
      <input 
        type="text" 
        v-model="newAudioUrl" 
        placeholder="Entrez un lien audio (ex: https://example.com/audio.mp3)" 
      />
      <!-- Bouton pour soumettre le lien audio -->
      <button type="submit">Ajouter</button>
    </form>

    <!-- Titre pour télécharger un fichier -->
    <h2>Ou téléchargez un fichier MP3</h2>
    <!-- Entrée pour sélectionner un fichier MP3 local -->
    <input type="file" @change="uploadFile" accept="audio/mpeg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Variable pour stocker l'URL du nouvel audio
      newAudioUrl: ''
    };
  },
  methods: {
    // Méthode appelée lors de l'ajout d'un audio via un lien
    addAudio() {
      // Émet un événement vers le parent avec l'URL de l'audio
      this.$emit('add-audio', this.newAudioUrl);
      // Réinitialise le champ de saisie après l'ajout
      this.newAudioUrl = '';
    },
    // Méthode appelée lors de la sélection d'un fichier local
    uploadFile(event) {
      // Récupère le fichier sélectionné par l'utilisateur
      const file = event.target.files[0];
      // Vérifie que le fichier est un fichier MP3
      if (file && file.type === 'audio/mpeg') {
        // Génère une URL temporaire pour accéder au fichier
        const fileUrl = URL.createObjectURL(file);
        // Émet un événement vers le parent avec les informations du fichier
        this.$emit('upload-file', { name: file.name, src: fileUrl, type: 'file' });
      }
    }
  }
};
</script>
