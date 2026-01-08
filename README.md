# pokemon_battle_arena

# Pokemon Battle Application

A full-stack application built with Angular, Node.js, and Supabase to manage Pokemon teams and simulate battles.

## ⚔️ Battle Algorithm

*Damage Formula:*
remain_life = life - (opponent_power * factor)

*Type Advantage (Factors):*
- *Fire* deals *2.0x* to Grass, **0.5x* to *Water, and **1.0x* to *Fire*.
- *Water* deals *2.0x* to *Fire, **0.5x* to *Grass, and **1.0x* to *Water*.
- *Grass* deals *2.0x* to *Water, **0.5x* to *Fire, and **1.0x* to *Grass*.

*Battle Logic:*
- The match is played 1vs1 until no member of a team is able to fight.
- When a Pokemon's life reaches 0 or less, it is switched out for the next member of the team.
- The winner of a round moves to the next round with their current remaining life.

---

## 💻 Technical Implementation

*Backend (Node.js):*
- Handles the connection to Supabase using environmental variables.
- Provides the API logic to interact with the PostgreSQL database.

*Frontend (Angular & Bootstrap):*
- Built using Angular and styled with Bootstrap for a responsive UI.
- Features a visual "VS" screen with health bars and navigation buttons (Next/Previous).

---

## 📊 Data Structure (SK)

The database is organized into the following relational structure:

*pokemon_type*
Stores elemental types: id and name.

*pokemon*
Stores stats: id, name, type, image, power (10-100), and life (50-100).

*weakness*
Stores the damage chart: id, type1, type2, and factor.

*teams & team_members*
Expanded schema to handle teams of exactly 6 Pokemons, allowing for duplicate Pokemons.

---

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

### 3. Frontend
1. Navigate to /frontend.
2. Run npm install.
3. Start the application with ng serve --open.

---

## 🛡️ Design Explanation

*Data Schema Choice:*
A relational schema was chosen to enforce data integrity, specifically for the power and life constraints required by the challenge.

*Algorithm Choice:*
The round-based algorithm was implemented to provide a clear step-by-step simulation as shown in the requirement examples.
   
## Output
[Link](https://drive.google.com/file/d/1PIApZy5It3T0RvOGe4oybgIfCaSp4NlH/view?usp=sharing)
