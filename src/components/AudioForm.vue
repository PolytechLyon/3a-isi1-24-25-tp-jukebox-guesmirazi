// filepath: /c:/Users/PC/Javascript jukebox/3a-isi1-24-25-tp-jukebox-guesmirazi/src/components/AudioForm.vue
<template>
  <div>
    <form @submit.prevent="onSubmit" class="mb-4">
      <div class="form-group">
        <label for="audioUrl">Ajouter un lien audio</label>
        <input v-model="audioUrl" type="text" class="form-control" id="audioUrl" placeholder="Entrez l'URL de l'audio">
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
    <form @submit.prevent="onFileSubmit" class="mb-4">
      <div class="form-group">
        <label for="audioFile">Choisir un fichier</label>
        <input @change="onFileSelect" type="file" class="form-control-file" id="audioFile">
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audioUrl: '',
      selectedFile: null
    };
  },
  methods: {
    onSubmit() {
      this.$emit('add-audio', this.audioUrl);
      this.audioUrl = '';
    },
    onFileSelect(event) {
      this.selectedFile = event.target.files[0];
    },
    onFileSubmit() {
      if (this.selectedFile) {
        this.$emit('upload-file', this.selectedFile);
        this.selectedFile = null;
      }
    }
  }
};
</script>