const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Test route to see your Pokemons in the browser
app.get('/api/pokemons', async (req, res) => {
  const { data, error } = await supabase.from('pokemon').select('*');
  if (error) return res.status(400).json(error);
  res.json(data);
});

// THIS LINE IS CRITICAL TO SEE OUTPUT
app.listen(3000, () => {
  console.log('--- SERVER STARTED ---');
  console.log('Backend running on http://localhost:3000');
});