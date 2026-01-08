-- 1. TABLES (Requirement 1 & 4)
CREATE TABLE pokemon_type (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE pokemon (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type_id UUID REFERENCES pokemon_type(id),
    image TEXT,
    power INTEGER CHECK (power BETWEEN 10 AND 100),
    life INTEGER CHECK (life BETWEEN 50 AND 100)
);

CREATE TABLE weakness (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type1 UUID REFERENCES pokemon_type(id),
    type2 UUID REFERENCES pokemon_type(id),
    factor FLOAT
);

CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    pokemon_id UUID REFERENCES pokemon(id),
    slot_order INTEGER CHECK (slot_order BETWEEN 1 AND 6)
);

-- 2. SEED DATA (Requirement 2 & 3)
INSERT INTO pokemon_type (name) VALUES ('fire'), ('water'), ('grass');

-- Add Weakness Chart
INSERT INTO weakness (type1, type2, factor)
SELECT t1.id, t2.id, 
  CASE 
    WHEN t1.name = 'fire' AND t2.name = 'fire' THEN 1
    WHEN t1.name = 'fire' AND t2.name = 'water' THEN 0.5
    WHEN t1.name = 'fire' AND t2.name = 'grass' THEN 2
    WHEN t1.name = 'water' AND t2.name = 'fire' THEN 2
    WHEN t1.name = 'water' AND t2.name = 'water' THEN 1
    WHEN t1.name = 'water' AND t2.name = 'grass' THEN 0.5
    WHEN t1.name = 'grass' AND t2.name = 'fire' THEN 0.5
    WHEN t1.name = 'grass' AND t2.name = 'water' THEN 2
    WHEN t1.name = 'grass' AND t2.name = 'grass' THEN 1
  END
FROM pokemon_type t1, pokemon_type t2;

-- (Optional: You can also paste your 15 Pokemon INSERTs here)

-- 3. FUNCTIONS (Requirement 5)
CREATE OR REPLACE FUNCTION insert_pokemon_team(p_team_name TEXT, p_pokemon_ids UUID[])
RETURNS VOID AS $$
BEGIN
    IF array_length(p_pokemon_ids, 1) != 6 THEN
        RAISE EXCEPTION 'A team must have exactly 6 Pokemons';
    END IF;

    WITH new_team AS (
        INSERT INTO teams (team_name) VALUES (p_team_name) RETURNING id
    )
    INSERT INTO team_members (team_id, pokemon_id, slot_order)
    SELECT (SELECT id FROM new_team), unnest(p_pokemon_ids), generate_series(1, 6);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_list_pokemon_teams()
RETURNS TABLE(team_id UUID, team_name TEXT, total_power BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT t.id, t.team_name, SUM(p.power) as total_power
    FROM teams t
    JOIN team_members tm ON t.id = tm.team_id
    JOIN pokemon p ON tm.pokemon_id = p.id
    GROUP BY t.id, t.team_name
    ORDER BY total_power DESC;
END;
$$ LANGUAGE plpgsql;
