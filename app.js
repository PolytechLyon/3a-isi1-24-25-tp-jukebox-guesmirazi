import { createApp, reactive } from 'vue';

// Composant principal de l'application
const App = {
    template: `
        <div>
            <!-- Contrôleur -->
            <div>
                <h2>Contrôleur</h2>
                <p v-if="currentTrack !== null">
                    Lecture : {{ playlist[currentTrack].name }}
                </p>
                <p v-else>Aucun titre en cours de lecture</p>
                <button @click="playPause">{{ isPlaying ? 'Pause' : 'Lecture' }}</button>
                <input type="range" v-model="progress" min="0" max="100" @change="jumpTo">
                <select v-model="repeatMode">
                    <option value="list">Répéter la liste</option>
                    <option value="track">Répéter le titre</option>
                    <option value="none">Aucun</option>
                </select>
            </div>

            <!-- Liste de lecture -->
            <div>
                <h2>Liste de lecture</h2>
                <ul>
                    <li v-for="(track, index) in playlist" :key="index">
                        {{ track.name }}
                        <button @click="playTrack(index)">Jouer</button>
                        <button @click="removeTrack(index)">Supprimer</button>
                    </li>
                </ul>
            </div>

            <!-- Formulaire d'ajout -->
            <div>
                <h2>Ajouter un titre</h2>
                <form @submit.prevent="addTrack">
                    <label>
                        <input type="radio" v-model="addMode" value="link"> Ajouter par lien
                    </label>
                    <label>
                        <input type="radio" v-model="addMode" value="file"> Ajouter par fichier
                    </label>
                    <div v-if="addMode === 'link'">
                        <input type="text" v-model="newTrackLink" placeholder="Lien du fichier audio">
                    </div>
                    <div v-if="addMode === 'file'">
                        <input type="file" @change="onFileSelect">
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            playlist: [], // Liste de lecture
            currentTrack: null, // Index du titre en cours
            isPlaying: false, // Indique si une piste est en cours de lecture
            progress: 0, // Progression de la lecture
            repeatMode: 'list', // Mode de répétition ('list', 'track', 'none')
            addMode: 'link', // Mode d'ajout ('link' ou 'file')
            newTrackLink: '', // Lien pour l'ajout par URL
            selectedFile: null // Fichier sélectionné pour l'ajout par fichier
        };
    },
    methods: {
        playPause() {
            if (this.currentTrack !== null) {
                this.isPlaying = !this.isPlaying;
            } else {
                alert('Aucun titre sélectionné');
            }
        },
        playTrack(index) {
            this.currentTrack = index;
            this.isPlaying = true;
        },
        removeTrack(index) {
            this.playlist.splice(index, 1);
            if (this.currentTrack === index) {
                this.currentTrack = null;
                this.isPlaying = false;
            }
        },
        addTrack() {
            if (this.addMode === 'link' && this.newTrackLink.trim() !== '') {
                this.playlist.push({ name: this.newTrackLink, type: 'link' });
                this.newTrackLink = '';
            } else if (this.addMode === 'file' && this.selectedFile) {
                this.playlist.push({ name: this.selectedFile.name, type: 'file' });
                this.selectedFile = null;
            } else {
                alert('Veuillez fournir un lien ou sélectionner un fichier.');
            }
        },
        onFileSelect(event) {
            this.selectedFile = event.target.files[0];
        },
        jumpTo(event) {
            console.log(`Progression mise à jour : ${this.progress}%`);
        }
    }
};

// Créer l'application Vue et l'attacher à l'élément #app
createApp(App).mount('#app');
