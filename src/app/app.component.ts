import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí
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
  imports: [CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  playlists: Playlist[] = [];  // Lista de playlists
  selectedPlaylist: Playlist | null = null;  // Playlist seleccionada
  currentSong: Song | null = null;  // Canción actualmente seleccionada
  audioSource: string = '';  // Fuente de la canción para el reproductor
  randomPlaylistSize: number = 5;  // Tamaño por defecto para la playlist aleatoria

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
// Método para seleccionar una playlist y empezar a reproducir la primera canción automáticamente
selectPlaylist(playlist: Playlist): void {
  console.log("Playlist seleccionada:", playlist);

  this.selectedPlaylist = playlist;

  if (playlist.songs.length > 0) {
    const firstSong = playlist.songs[0];
    this.playSong(firstSong);  // Aquí empieza la reproducción automáticamente
  } else {
    this.currentSong = null;
    this.audioSource = '';
  }
}


playSong(song: Song): void {
  console.log("Reproduciendo canción:", song);
  this.currentSong = song;
  this.audioSource = `http://localhost:8000/mp3/${song.fileTitle}.mp3`;

  // Espera un poco para asegurar que el audio se recarga bien
  setTimeout(() => {
    const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audio) {
      audio.load();  // Recarga el elemento de audio
      audio.play();  // Reproduce
    }
  }, 0);
}

  nextSong(): void {
    if (this.selectedPlaylist && this.selectedPlaylist.songs.length > 0) {
      const currentIndex = this.selectedPlaylist.songs.findIndex(
        song => song.id === this.currentSong?.id
      );
  
      let nextIndex = currentIndex + 1;
  
      // Si es la última canción, vuelve al principio
      if (nextIndex >= this.selectedPlaylist.songs.length) {
        nextIndex = 0;
      }
  
      const nextSong = this.selectedPlaylist.songs[nextIndex];
      this.playSong(nextSong);
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

  // Método para crear una playlist aleatoria
  createRandomPlaylist(): void {
    const availableSongs = this.getAllSongs();  // Aquí necesitas un método para obtener todas las canciones
    const randomSongs = this.getRandomSongs(availableSongs, this.randomPlaylistSize);

    const newPlaylist: Playlist = {
      id: this.playlists.length + 1,
      name: `Playlist Aleatoria ${this.playlists.length + 1}`,
      songs: randomSongs
    };

    this.playlists.push(newPlaylist);  // Agrega la nueva playlist aleatoria a la lista de playlists
  }

  // Método para obtener todas las canciones de todas las playlists (o puedes crear una lista global de canciones)
  getAllSongs(): Song[] {
    return this.playlists.flatMap(playlist => playlist.songs);
  }

  // Método para seleccionar canciones aleatorias
  getRandomSongs(songs: Song[], num: number): Song[] {
    const shuffled = songs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
}
