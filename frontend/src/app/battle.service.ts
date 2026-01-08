import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BattleService {
  
  // Requirement 5: Calculate damage based on the weakness factor [cite: 49, 55]
  simulateRound(p1: any, p2: any, factor1: number, factor2: number) {
    // p1 attacks p2, and p2 attacks p1 simultaneously [cite: 55]
    const p1NewLife = p1.life - (p2.power * factor2); 
    const p2NewLife = p2.life - (p1.power * factor1);

    return {
      p1Life: Math.max(0, p1NewLife),
      p2Life: Math.max(0, p2NewLife)
    };
  }

  // logic to loop through the 6 vs 6 battle [cite: 22, 34, 46]
  runFullBattle(teamA: any[], teamB: any[]) {
    let indexA = 0;
    let indexB = 0;
    let history = [];

    // Battle continues until one team has no members able to fight [cite: 46]
    while (indexA < 6 && indexB < 6) {
      const fighterA = teamA[indexA];
      const fighterB = teamB[indexB];

      // You must fetch the 'factor' from your 'weakness' table here [cite: 15, 18]
      const result = this.simulateRound(fighterA, fighterB, 1.0, 1.0); 

      fighterA.life = result.p1Life;
      fighterB.life = result.p2Life;

      history.push({ teamAHealth: fighterA.life, teamBHealth: fighterB.life });

      // Switch out pokemon if life is 0 
      if (fighterA.life <= 0) indexA++;
      if (fighterB.life <= 0) indexB++;
    }

    return {
      winner: indexA < 6 ? 'Team A' : 'Team B', // [cite: 39]
      log: history
    };
  }
}