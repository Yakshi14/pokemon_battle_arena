from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# --- CONNECT FRONTEND TO BACKEND (CORS) ---
# This allows your Angular app to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.get("/")
async def root():
    return {"status": "Pokemon Battle API is running"}

# Requirement 3: Get all Pokemons [cite: 30]
@app.get("/pokemon")
async def get_pokemon():
    response = supabase.table("pokemon").select("*").execute()
    return response.data

# Requirement 5: Get teams leaderboard [cite: 26, 32]
@app.get("/teams/leaderboard")
async def get_leaderboard():
    # Calling the PostgreSQL function created in Supabase
    response = supabase.rpc("get_teams_by_power").execute()
    return response.data

# The Battle Algorithm [cite: 48, 49]
@app.post("/battle/simulate")
async def simulate_round(data: dict):
    """
    Formula: remain_life = life - opponent_power * factor [cite: 49]
    """
    p1 = data.get('p1')
    p2 = data.get('p2')
    factor1 = data.get('factor1') # p1 vs p2
    factor2 = data.get('factor2') # p2 vs p1

    p1_remain = p1['life'] - (p2['power'] * factor2)
    p2_remain = p2['life'] - (p1['power'] * factor1)

    return {
        "p1_life": max(0, p1_remain),
        "p2_life": max(0, p2_remain)
    }