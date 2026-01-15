# ⚔️ Pokémon Battle Arena

[![Angular](https://img.shields.io/badge/Frontend-Angular-dd0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)

A high-performance, full-stack application designed to manage Pokémon teams and simulate elemental battles with real-time stat updates.

---

## 🎮 Battle Engine & Algorithm

The core simulation logic follows a strict mathematical model to determine outcomes based on elemental advantages.

### 📐 The Damage Formula
$$remain\_life = life - (opponent\_power \times factor)$$

### 🍎 Elemental Weakness Chart
| Attacker | Defender | Multiplier (Factor) |
| :--- | :--- | :--- |
| **Fire** 🔥 | Grass 🌿 | **2.0x** (Super Effective) |
| **Fire** 🔥 | Water 💧 | **0.5x** (Not Effective) |
| **Water** 💧 | Fire 🔥 | **2.0x** (Super Effective) |
| **Water** 💧 | Grass 🌿 | **0.5x** (Not Effective) |
| **Grass** 🌿 | Water 💧 | **2.0x** (Super Effective) |
| **Grass** 🌿 | Fire 🔥 | **0.5x** (Not Effective) |

> **Battle Logic:** Matches are 1vs1. When a Pokémon's life drops to $\le 0$, the next team member (out of 6) is automatically tagged in. The winner retains their current life for the next round.

---

## 🛠️ Technical Architecture

### 🐍 Backend (Python - FastAPI) - *Current Focus*
* **CORS Integration:** Bridge established between Port 4200 (Angular) and Port 8000 (Python).
* **Security:** Calculation integrity is maintained by processing battle logic server-side via POST requests.
* **Database Client:** Uses `supabase-py` for asynchronous interaction with PostgreSQL.

### 🅰️ Frontend (Angular & Bootstrap)
* **Reactive UI:** Visual "VS" arena with real-time health bar animations.
* **Data Flow:** Communicates via `pokemon.service.ts` using Angular’s `HttpClient`.

---

## 📊 Database Schema
The system uses a normalized PostgreSQL structure in Supabase:

* **`pokemon_type`**: Defines elemental IDs and labels.
* **`pokemon`**: Core stats (Power: $10-100$, Life: $50-100$).
* **`weakness`**: The relational matrix for damage multipliers.
* **`teams`**: Stores unique rosters of exactly 6 Pokémon (allows duplicates).

---

## 🚀 Setup & Installation

### 1️⃣ Database Setup
1. Create a project at [Supabase](https://supabase.com/).
2. Execute `database/schema.sql` in the SQL Editor to generate tables and the `get_teams_by_power` function.

### 2️⃣ Backend (Option Python - Recommended)
```bash
cd backend
python -m venv venv
# Activate: .\venv\Scripts\activate (Win) or source venv/bin/activate (Mac)
pip install -r requirements.txt
# Add SUPABASE_URL and SUPABASE_KEY to .env
python -m uvicorn main:app --reload

## ⚙️ Setup Instructions

### Prerequisites
Create a project on [Supabase](https://supabase.com/).

### 1. Database Configuration
Run the provided PostgreSQL scripts in the Supabase SQL Editor:
Execute database/schema.sql to create tables and functions.
This includes the insert_pokemon_team and get_list_pokemon_teams functions.

### 2(Option-A). Backend Setup(Node.js)
1. Navigate to /backend.
2. Install dependencies: npm install.
3. Create a .env file with your credentials:
   ```env
   SUPABASE_URL=your_project_url
   SUPABASE_KEY=your_anon_key

### 2(Option-B). Backend Setup(Python)
1. Navigate to the /backend directory.
2. Create a virtual environment: python -m venv venv.
3. Activate the virtual environment:
          Windows: venv\Scripts\activate
          Mac/Linux: source venv/bin/activate
4. Install dependencies: pip install -r requirements.txt. 
5. Create a .env file with your credentials:
   ```env
   SUPABASE_URL=your_project_url
   SUPABASE_KEY=your_anon_key
6. start the server: python -m uvicorn main:app --reload.

### 3. Frontend
1. Navigate to /frontend.
2. Run npm install.
3. Start the application with ng serve --open.
4. Open the UI at http://localhost:4200.

---

## 🛡️ Design Explanation

*Data Schema Choice:*
A relational schema was chosen to enforce data integrity, specifically for the power and life constraints required by the challenge.

*Algorithm Choice:*
The round-based algorithm was implemented to provide a clear step-by-step simulation as shown in the requirement examples.
   
## Output
[Link](https://drive.google.com/file/d/1PIApZy5It3T0RvOGe4oybgIfCaSp4NlH/view?usp=sharing)
