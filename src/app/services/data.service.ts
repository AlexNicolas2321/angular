import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8000/angular'; // Ruta que devuelve el JSON
  private apiUrl2 = 'http://localhost:8000'; // Ruta que devuelve el JSON

  constructor(private http: HttpClient) {}

  getPlaylistSongs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getSongLikes(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl2}/songs/likes`);
  }

  // Incrementar el like de una canción
  likeSong(songId: number): Observable<any> {
    return this.http.post(`${this.apiUrl2}/songs/${songId}/like`, {});
  }
}
