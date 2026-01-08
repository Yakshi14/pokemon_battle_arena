# pokemon_battle_arena

# Pokemon Battle Application

[cite_start]A full-stack application built for managing Pokemon, creating teams, and simulating battles with type-advantage logic[cite: 1, 4, 5].

## 🚀 Features
* [cite_start]*Pokemon Management*: View and update the list of favorite Pokemons and their stats[cite: 2, 3, 30, 31].
* [cite_start]*Team Building*: Create teams consisting of exactly six Pokemons (duplicates allowed)[cite: 4, 21, 22, 23].
* [cite_start]*Battle Simulation*: Visual 1vs1 battle simulation between two teams with round-by-round navigation[cite: 5, 34, 36].
* [cite_start]*Dynamic Ranking*: List teams ordered by the total power of their members[cite: 26, 32].

## 🛠 Tech Stack
* [cite_start]*Frontend*: Angular, TypeScript, HTML/CSS, Bootstrap[cite: 28].
* [cite_start]*Backend*: Node.js[cite: 28].
* [cite_start]*Database*: Supabase (PostgreSQL)[cite: 7].

## 📊 Database Schema
[cite_start]The database uses a relational structure to ensure data integrity[cite: 9, 61]:
* [cite_start]*pokemon_type*: Stores element types (Fire, Water, Grass)[cite: 10, 11].
* *pokemon*: Stores stats including power (10-100) and life (50-100)[cite: 12, 13].
* [cite_start]*weakness*: Stores the damage factor between different types[cite: 14, 15].
* [cite_start]*teams & team_members*: Expanded schema to handle 6-member team compositions[cite: 21].

## ⚔️ Battle Algorithm
[cite_start]The simulation follows a 1vs1 match-up until all members of a team are unable to fight[cite: 46].

### Damage Formula
The health remaining after a round is calculated as:
[cite_start]$$remain\_life = life - (opponent\_power \times factor)$$ [cite: 49, 55]

* [cite_start]*Factor*: Determined by the type-advantage chart (e.g., Water deals 2.0x damage to Fire)[cite: 17, 18, 54].
* [cite_start]*Switching*: If a Pokemon's life reaches 0, the next team member enters the battle[cite: 56].
* [cite_start]*Persistence*: Winners move to the next round with their current remaining life[cite: 57].

## ⚙️ Setup Instructions

### Prerequisites
* [cite_start]Create a project on [Supabase](https://supabase.com/)[cite: 7].

### 1. Database Configuration
Run the provided PostgreSQL scripts in the Supabase SQL Editor:
* [cite_start]Execute database/schema.sql to create tables and functions[cite: 62].
* [cite_start]This includes the insert_pokemon_team and get_list_pokemon_teams functions[cite: 25, 26].

### 2. Backend Setup
1. Navigate to /backend.
2. Install dependencies: npm install.
3. [cite_start]Create a .env file with your credentials[cite: 60, 61]:
   ```env
   SUPABASE_URL=your_project_url
   SUPABASE_KEY=your_anon_key
