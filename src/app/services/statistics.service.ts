// statistics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatisticsData } from '../statistics/statistics.interface';  // Importa la interfaz

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8000/statistics/data';  // URL de tu API

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<StatisticsData> {
    return this.http.get<StatisticsData>(this.apiUrl);
  }
}
