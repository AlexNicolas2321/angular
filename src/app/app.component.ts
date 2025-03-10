import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { CommonModule } from '@angular/common';
import { Song } from './models/song.model';

// Asegúrate de tener la estructura de Playlist
interface Playlist {
  id: number;
  name: string;
  songs: Song[];  // Array de canciones
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  playlists: Playlist[] = [];  // Lista de playlists
  selectedPlaylist: Playlist | null = null;  // Playlist seleccionada
  currentSong: Song | null = null;  // Canción actualmente seleccionada
  audioSource: string = '';  // Fuente de la canción para el reproductor

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPlaylistSongs().subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);
        this.playlists = data.playList; // <- asegurarte que es playList
      },
      error: (error) => {
        console.error("Error en la llamada HTTP", error);
      }
    });
  }

  // Método para seleccionar una playlist
  selectPlaylist(playlist: Playlist): void {
    console.log("Playlist seleccionada:", playlist);
    this.selectedPlaylist = playlist;  // Establece la playlist seleccionada
    this.currentSong = null;  // Resetea la canción actual
    this.audioSource = '';  // Resetea la fuente de la canción
  }

  // Método para manejar el clic en una canción
  playSong(song: Song): void {
    console.log("Reproduciendo canción:", song);
    this.currentSong = song;  // Establece la canción seleccionada
    this.audioSource = `http://localhost:8000/mp3/${song.fileTitle}.mp3`;  // Establece la fuente de la canción
    
    // Reproduce la canción automáticamente
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audio) {
      audio.load();  // Recarga el reproductor con la nueva fuente
      audio.play();  // Inicia la reproducción
    }
  }

  // Método para pasar a la siguiente canción
  nextSong(): void {
    if (this.selectedPlaylist && this.selectedPlaylist.songs.length > 0) {
      const currentIndex = this.selectedPlaylist.songs.findIndex(song => song.id === this.currentSong?.id);

      // Si no es la última canción, pasa a la siguiente, si no vuelve al principio
      if (currentIndex !== -1) {
        if (currentIndex < this.selectedPlaylist.songs.length - 1) {
          this.currentSong = this.selectedPlaylist.songs[currentIndex + 1];
        } else {
          this.currentSong = this.selectedPlaylist.songs[0]; // Volver a la primera canción
        }
        this.audioSource = `http://localhost:8000/mp3/${this.currentSong.fileTitle}.mp3`;
        
        // Reproduce la siguiente canción automáticamente
        this.playSong(this.currentSong);  // Llama al método playSong para iniciar la reproducción
      }
    }
  }

  // Método para pasar a la canción anterior
  previousSong(): void {
    if (this.selectedPlaylist && this.selectedPlaylist.songs.length > 0) {
      const currentIndex = this.selectedPlaylist.songs.findIndex(song => song.id === this.currentSong?.id);

      // Si no es la primera canción, pasa a la anterior, si no va al final
      if (currentIndex !== -1) {
        if (currentIndex > 0) {
          this.currentSong = this.selectedPlaylist.songs[currentIndex - 1];
        } else {
          this.currentSong = this.selectedPlaylist.songs[this.selectedPlaylist.songs.length - 1]; // Volver a la última canción
        }
        this.audioSource = `http://localhost:8000/mp3/${this.currentSong.fileTitle}.mp3`;
        
        // Reproduce la canción anterior automáticamente
        this.playSong(this.currentSong);  // Llama al método playSong para iniciar la reproducción
      }
    }
  }
}
