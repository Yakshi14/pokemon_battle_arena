import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // This is the URL where your Python (FastAPI/Flask) server is running
  private apiUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }

  // Get all Pokemons for the list view
  getPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon`);
  }

  // Get the leaderboard ordered by power sum (Requirement 5)
  getLeaderboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams/leaderboard`);
  }

  // Send battle data to Python to calculate the round (The Algorithm)
  simulateRound(battleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/battle/simulate`, battleData);
  }
}
