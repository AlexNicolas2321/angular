import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8000/angular'; // Ruta que devuelve el JSON

  constructor(private http: HttpClient) {}

  getPlaylistSongs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
