<template>
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

    <h2>Ou téléchargez un fichier MP3</h2>
    <input type="file" @change="uploadFile" accept="audio/mpeg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      newAudioUrl: ''
    };
  },
  methods: {
    addAudio() {
      this.$emit('add-audio', this.newAudioUrl);
      this.newAudioUrl = '';
    },
    uploadFile(event) {
      const file = event.target.files[0];
      if (file && file.type === 'audio/mpeg') {
        const fileUrl = URL.createObjectURL(file);
        this.$emit('upload-file', { name: file.name, src: fileUrl, type: 'file' });
      }
    }
  }
};
</script>