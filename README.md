# pokemon_battle_arena

# Pokemon Battle Application

A full-stack application built for managing Pokemon, creating teams, and simulating battles with type-advantage logic.

## 🚀 Features
**Pokemon Management*: View and update the list of favorite Pokemons and their stats.
*Team Building*: Create teams consisting of exactly six Pokemons (duplicates allowed).
*Battle Simulation*: Visual 1vs1 battle simulation between two teams with round-by-round navigation.
*Dynamic Ranking*: List teams ordered by the total power of their members.

## 🛠 Tech Stack
*Frontend*: Angular, TypeScript, HTML/CSS, Bootstrap.
*Backend*: Node.js.
*Database*: Supabase (PostgreSQL).

## 📊 Database Schema
The database uses a relational structure to ensure data integrity:
*pokemon_type*: Stores element types (Fire, Water, Grass).
*pokemon*: Stores stats including power (10-100) and life (50-100).
*weakness*: Stores the damage factor between different types.
*teams & team_members*: Expanded schema to handle 6-member team compositions.

## ⚔️ Battle Algorithm
The simulation follows a 1vs1 match-up until all members of a team are unable to fight.

### Damage Formula
The health remaining after a round is calculated as:
$$remain\_life = life - (opponent\_power \times factor)$$ 

*Factor*: Determined by the type-advantage chart (e.g., Water deals 2.0x damage to Fire).
*Switching*: If a Pokemon's life reaches 0, the next team member enters the battle.
*Persistence*: Winners move to the next round with their current remaining life.

## ⚙️ Setup Instructions

### Prerequisites
Create a project on [Supabase](https://supabase.com/).

### 1. Database Configuration
Run the provided PostgreSQL scripts in the Supabase SQL Editor:
Execute database/schema.sql to create tables and functions.
This includes the insert_pokemon_team and get_list_pokemon_teams functions.

### 2. Backend Setup
1. Navigate to /backend.
2. Install dependencies: npm install.
3. Create a .env file with your credentials:
   ```env
   SUPABASE_URL=your_project_url
   SUPABASE_KEY=your_anon_key
### Output
