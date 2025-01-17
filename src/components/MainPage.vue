<template>
  <div>
    <!-- Barre de navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="#">Projet Juxebox Guesmi Mohamed Amine et Razi Yassine</a>
    </nav>
    
    <!-- Conteneur principal -->
    <div class="container">
      <!-- Titre principal de la page -->
      <h1 class="my-4">Boîte Musicale</h1>

      <!-- Bouton pour naviguer vers la gestion des playlists -->
      <button class="btn btn-primary mb-3" @click="$router.push('/manage-playlists')">
        Gérer les listes de lecture
      </button>

      <!-- Description de l'application -->
      <p>Ajoutez des liens audio ou téléchargez des fichiers MP3 pour les écouter !</p>

      <!-- Nom de la playlist actuellement sélectionnée -->
      <p v-if="selectedPlaylistName">
        Liste de lecture sélectionnée : {{ selectedPlaylistName }}
      </p>

      <!-- Sélecteur de mode de répétition -->
      <div class="mb-3">
        <label for="repeatMode">Mode de répétition :</label>
        <select id="repeatMode" v-model="repeatMode" class="form-control">
          <option value="none">Aucun</option>
          <option value="track">Titre</option>
          <option value="list">Liste</option>
        </select>
      </div>

      <!-- Formulaire pour ajouter des audios -->
      <AudioForm @add-audio="addAudio" @upload-file="uploadFile" />
      
      <!-- Liste de lecture avec gestion des audios -->
      <Playlist 
        :playlist="currentPlaylist.tracks" 
        @play-audio="playAudio" 
        @remove-audio="removeAudio" 
      />

      <!-- Lecteur audio -->
      <AudioPlayer 
        :playlist="currentPlaylist.tracks" 
        :currentAudioIndex="currentAudioIndex" 
        :repeatMode="repeatMode"
        @play-audio="playAudio" 
      />
    </div>
  </div>
</template>

<script>
import AudioForm from './AudioForm.vue';
import Playlist from './Playlist.vue';
import AudioPlayer from './AudioPlayer.vue';

export default {
  components: {
    AudioForm,  // Composant pour ajouter des audios (par lien ou fichier)
    Playlist,   // Composant pour afficher et gérer la liste des titres
    AudioPlayer // Composant pour lire les audios
  },
  data() {
    return {
      // Listes de lecture sauvegardées (chargées depuis le localStorage)
      playlists: JSON.parse(localStorage.getItem('playlists')) || [],
      // Index de la playlist actuellement sélectionnée
      selectedPlaylistIndex: JSON.parse(localStorage.getItem('selectedPlaylistIndex')) || 0,
      // Index du titre audio en cours de lecture
      currentAudioIndex: null,
      // Mode de répétition : aucun, répétition de la liste ou du titre
      repeatMode: 'none' // Mode par défaut
    };
  },
  computed: {
    // Playlist actuellement sélectionnée
    currentPlaylist() {
      return this.playlists[this.selectedPlaylistIndex] || { name: '', tracks: [] };
    },
    // Nom de la playlist actuellement sélectionnée
    selectedPlaylistName() {
      return this.currentPlaylist.name;
    }
  },
  created() {
    // Charge les playlists sauvegardées au démarrage de la page
    this.loadPlaylist();
  },
  methods: {
    // Ajoute un lien audio à la playlist actuelle
    addAudio(url) {
      if (url.trim() && !this.currentPlaylist.tracks.find(audio => audio.src === url)) {
        const newAudio = { name: url, src: url, type: 'url' }; // Crée un nouvel objet audio
        this.currentPlaylist.tracks.push(newAudio); // Ajoute à la liste
        this.savePlaylist(); // Sauvegarde dans le localStorage
      }
    },
    // Ajoute un fichier audio à la playlist actuelle
    uploadFile(file) {
      this.currentPlaylist.tracks.push(file); // Ajoute directement l'objet fichier
      this.savePlaylist(); // Sauvegarde la playlist mise à jour
    },
    // Change le titre actuellement en lecture
    playAudio(index) {
      this.currentAudioIndex = index; // Définit l'index de lecture
    },
    // Supprime un titre de la playlist
    removeAudio(index) {
      const wasPlaying = index === this.currentAudioIndex; // Vérifie si le titre supprimé était en cours de lecture
      this.currentPlaylist.tracks.splice(index, 1); // Supprime le titre
      if (wasPlaying) {
        this.currentAudioIndex = null; // Réinitialise la lecture si nécessaire
      }
      this.savePlaylist(); // Sauvegarde la playlist mise à jour
    },
    // Sauvegarde la playlist actuelle dans le localStorage
    savePlaylist() {
      this.playlists[this.selectedPlaylistIndex] = this.currentPlaylist;
      localStorage.setItem('playlists', JSON.stringify(this.playlists));
    },
    // Charge les playlists depuis le localStorage
    loadPlaylist() {
      const savedPlaylists = localStorage.getItem('playlists');
      if (savedPlaylists) {
        this.playlists = JSON.parse(savedPlaylists); // Met à jour la variable playlists
      }
    }
  }
};
</script>
