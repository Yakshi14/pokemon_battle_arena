import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentRound = 1;
  winner: string | null = null;
  
  // Requirement 5: Navigator round requires storing the history 
  battleHistory: any[] = [];

  // Requirement 4: Teams must have 6 pokemons [cite: 21, 22]
  teamA = [
    { name: 'Bulbasaur', life: 100, power: 50, type: 'grass', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { name: 'Ivysaur', life: 100, power: 60, type: 'grass', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
    { name: 'Venusaur', life: 100, power: 80, type: 'grass', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
    { name: 'Oddish', life: 50, power: 20, type: 'grass', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png' },
    { name: 'Gloom', life: 70, power: 40, type: 'grass', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png' },
    { name: 'Vileplume', life: 90, power: 70, type: 'grass', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png' },
  ];

  teamB = [
    { name: 'Charmander', life: 80, power: 55, type: 'fire', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { name: 'Charmeleon', life: 90, power: 65, type: 'fire', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png' },
    { name: 'Charizard', life: 100, power: 90, type: 'fire', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
    { name: 'Vulpix', life: 50, power: 30, type: 'fire', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png' },
    { name: 'Ninetales', life: 80, power: 75, type: 'fire', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png' },
    { name: 'Growlithe', life: 60, power: 45, type: 'fire', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png' },
  ];

  // Battle rules: played 1vs1 [cite: 46]
  activeP1 = this.teamA[0];
  activeP2 = this.teamB[0];

  nextRound() {
    if (this.activeP1.life > 0 && this.activeP2.life > 0) {
      // 1. Save state BEFORE calculation to allow "PREVIOUS" navigation 
      this.battleHistory.push({
        round: this.currentRound,
        p1Idx: this.teamA.indexOf(this.activeP1),
        p2Idx: this.teamB.indexOf(this.activeP2),
        p1Life: this.activeP1.life,
        p2Life: this.activeP2.life
      });

      // 2. Damage Calculation using the formula: remain_life = life - opponent_power * factor [cite: 49]
      const factor1to2 = this.getFactor(this.activeP1.type, this.activeP2.type);
      const factor2to1 = this.getFactor(this.activeP2.type, this.activeP1.type);

      this.activeP1.life = Math.max(0, this.activeP1.life - (this.activeP2.power * factor2to1));
      this.activeP2.life = Math.max(0, this.activeP2.life - (this.activeP1.power * factor1to2));
      
      this.currentRound++; // [cite: 41]

      // 3. Switch out pokemon if life is 0 
      this.checkFainted();
    }
  }

  // Logic for the PREVIOUS button [cite: 40]
  previousRound() {
    if (this.battleHistory.length > 0) {
      const prevState = this.battleHistory.pop();
      
      // Revert indexes and life 
      this.activeP1 = this.teamA[prevState.p1Idx];
      this.activeP2 = this.teamB[prevState.p2Idx];
      this.activeP1.life = prevState.p1Life;
      this.activeP2.life = prevState.p2Life;
      
      this.currentRound = prevState.round;
      this.winner = null; // Reset winner display if navigating back [cite: 39]
    }
  }

  getFactor(type1: string, type2: string): number {
    // Requirement 2: Weakness chart factors [cite: 17, 18, 54]
    const chart: any = {
      fire: { water: 0.5, grass: 2, fire: 1 },
      water: { fire: 2, grass: 0.5, water: 1 },
      grass: { fire: 0.5, water: 2, grass: 1 }
    };
    return chart[type1][type2] || 1;
  }

  checkFainted() {
    // Requirement 5: Switch out pokemon no longer has life 
    if (this.activeP1.life <= 0) {
      const nextIdx = this.teamA.indexOf(this.activeP1) + 1;
      if (nextIdx < 6) this.activeP1 = this.teamA[nextIdx];
      else this.winner = 'Team B'; // [cite: 39]
    }
    
    if (this.activeP2.life <= 0) {
      const nextIdx = this.teamB.indexOf(this.activeP2) + 1;
      if (nextIdx < 6) this.activeP2 = this.teamB[nextIdx];
      else this.winner = 'Team A'; // [cite: 39]
    }
  }
}