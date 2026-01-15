# ⚔️ Pokémon Battle Arena

[![Angular](https://img.shields.io/badge/Frontend-Angular-dd0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)

A full-stack application built to manage Pokémon teams and simulate elemental battles. The project demonstrates a clean separation of concerns, a robust relational database schema, and a cross-platform backend implementation.

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

> **Battle Logic:** Matches are played 1vs1 until no member of a team is able to fight. When a Pokémon's life reaches 0 or less, it is switched out for the next member. Winners retain their current life for the next round.

---

## 🛠️ Technical Implementation

### 🐍 Backend (Python - FastAPI)
* **CORS Integration:** Established to securely connect Angular (Port 4200) to the Python API (Port 8000).
* **Integrity:** Processes battle logic server-side via POST requests to ensure calculation accuracy.
* **Client:** Uses `supabase-py` for asynchronous interaction with the PostgreSQL database.

### 🟢 Backend (Node.js)
* **Environment:** Handles Supabase connections using secure `.env` variables.
* **API Logic:** Provides a RESTful interface to interact with the database tables and functions.

### 🅰️ Frontend (Angular & Bootstrap)
* **Responsive UI:** Visual "VS" screen with real-time health bars and round-by-round navigation.
* **Services:** Centralized data fetching via `pokemon.service.ts` using Angular's `HttpClient`.

---

## 📊 Data Structure
The database is organized into a normalized relational structure:

* **`pokemon_type`**: Stores elemental types (ID and Name).
* **`pokemon`**: Stores stats (Name, Type, Image, Power 10-100, Life 50-100).
* **`weakness`**: Stores the damage chart (Type1 vs Type2 Factors).
* **`teams`**: Expanded schema to handle rosters of exactly 6 Pokémon, supporting duplicate entries.

---

## ⚙️ Setup Instructions

### 1️⃣ Database Configuration
1. Create a project on [Supabase](https://supabase.com/).
2. Run `database/schema.sql` in the SQL Editor to create tables and functions.
3. This includes the `insert_pokemon_team` and `get_list_pokemon_teams` functions.

### 2️⃣ Backend Setup (Choose ONE)

#### **Option A: Node.js**
1. Navigate to `/backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file with your `SUPABASE_URL` and `SUPABASE_KEY`.
4. Start server: `node server.js` (or your specific start command).

#### **Option B: Python (Recommended)**
1. Navigate to `/backend`.
2. Create virtual environment: `python -m venv venv`.
3. Activate:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`.
5. Create a `.env` file with your `SUPABASE_URL` and `SUPABASE_KEY`.
6. Start server: `python -m uvicorn main:app --reload`.

### 3️⃣ Frontend Setup
1. Navigate to `/frontend`.
2. Run `npm install`.
3. Start application: `ng serve --open`.
4. Open UI at: `http://localhost:4200`.

---

## 🛡️ Design Explanation

* **Data Schema Choice:** A relational schema was chosen to enforce data integrity at the database level, specifically for the power ($10$-$100$) and life ($50$-$100$) constraints required by the challenge.
* **Algorithm Choice:** The round-based algorithm was implemented to provide a clear, step-by-step simulation as shown in the requirement examples, allowing the user to track battle progression visually.

---

## 🎬 Project Output
[**View Results & Video Demo**](https://drive.google.com/file/d/1PIApZy5It3T0RvOGe4oybgIfCaSp4NlH/view?usp=sharing)
