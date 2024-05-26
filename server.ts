import express from 'express';
import { Pokemon } from './pokemon';
import { Move } from './move';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import session from './session';
import { connect, login, register } from "./database";
import { User } from './types';
import { secureMiddleware } from './secureMiddleware';
import { flashMiddleware } from './flashMiddleware';

dotenv.config();
const uri = process.env.MONGODB_URI; // Fill in your MongoDB connection string here
export const client = new MongoClient(uri as string);

const app = express();

app.set('port', process.env.PORT || 3000);


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(flashMiddleware);
export let moveData: Move[] = [];
export let pokemonData: Pokemon[] = [];

const typeColors = {
  normal: "var(--normal)",
  fire: "var(--fire)",
  water: "var(--water)",
  electric: "var(--electric)",
  grass: "var(--grass)",
  ice: "var(--ice)",
  fighting: "var(--fighting)",
  poison: "var(--poison)",
  ground: "var(--ground)",
  flying: "var(--flying)",
  psychic: "var(--psychic)",
  bug: "var(--bug)",
  rock: "var(--rock)",
  ghost: "var(--ghost)",
  dragon: "var(--dragon)",
  dark: "var(--dark)",
  steel: "var(--steel)",
  fairy: "var(--fairy)"
};
// Helper function
function sortData(data: any, sortBy: any, order: any) {
  const compare = (a: any, b: any) => {
    if (a[sortBy] < b[sortBy]) return order === 'desc' ? 1 : -1;
    if (a[sortBy] > b[sortBy]) return order === 'desc' ? -1 : 1;
    return 0;
  };
  data.sort(compare);
}

app.get('/', secureMiddleware, (req, res) => {
  let filteredPokemonData = pokemonData;
  const searchName = req.query.pokemon_name as string;
  if (req.query.pokemon_name) {
    filteredPokemonData = filteredPokemonData.filter(pokemon => pokemon.pokemon_name.toLowerCase().includes(searchName?.toLowerCase()));
  }
  if (req.query.nameSort) {
    sortData(filteredPokemonData, 'pokemon_name', req.query.nameSort);
  }
  if (req.query.birthdateSort) {
    sortData(filteredPokemonData, 'pokemon_birthdate', req.query.birthdateSort);
  }
  if (req.query.weightSort) {
    sortData(filteredPokemonData, 'pokemon_weight', req.query.weightSort);
  }

  res.render('index', { pageTitle: "Thuis", pokemons: filteredPokemonData, typeColors });
});

app.get('/moves', secureMiddleware, (req, res) => {
  let sortedMoveData = moveData;
  const searchName = req.query.move_name as string;
  if (req.query.move_name) {
    sortedMoveData = sortedMoveData.filter(move => move.move_name.toLowerCase().includes(searchName?.toLowerCase()));
  }
  if (req.query.nameSort) {
    sortData(sortedMoveData, 'move_name', req.query.nameSort);
  }
  if (req.query.accuracySort) {
    sortData(sortedMoveData, 'move_accuracy', req.query.accuracySort);
  }
  if (req.query.powerSort) {
    sortData(sortedMoveData, 'move_power', req.query.powerSort);
  }

  res.render('moves', { pageTitle: "Pokemon Moves", moves: sortedMoveData });
});

app.get('/pokemon/:id', secureMiddleware, (req, res) => {
  const pokemon = pokemonData.find(pokemon => pokemon.pokemon_id === parseInt(req.params.id));
  if (pokemon) {
    res.render('details', { pokemon });
  } else {
    res.status(404);
    res.render('404', { pageTitle: "404 Not Found" });
  }
});

app.get('/moves/:id', secureMiddleware, (req, res) => {
  const move = moveData.find(move => move.move_id === parseInt(req.params.id));
  if (move) {
    res.render('moveDetails', { move });
  } else {
    res.status(404);
    res.render('404', { pageTitle: "404 Not Found" });
  }
});

app.get('/pokemon/:id/edit', secureMiddleware, (req, res) => {
  const pokemon = pokemonData.find(pokemon => pokemon.pokemon_id === parseInt(req.params.id));
  if (pokemon) {
    res.render('edit', { pokemon });
  } else {
    res.status(404);
    res.render('404', { pageTitle: "404 Not Found" });
  }
});

app.post('/pokemon/:id/edit', secureMiddleware, async (req, res) => {
  const pokemon = pokemonData.find(pokemon => pokemon.pokemon_id === parseInt(req.params.id));
  if (!pokemon) {
    return res.status(404).send('Pokemon not found');
  }
  const { name, type, image, weight, active, phrase } = req.body;

  await client.db("DB_Pokemons").collection("Pokemons").updateOne(
    { pokemon_id: pokemon.pokemon_id },
    {
      $set: {
        pokemon_name: name,
        pokemon_type: type,
        pokemon_url: image,
        pokemon_weight: weight,
        is_pokemon_active: active.toLowerCase() === 'true' ? true : false,
        pokemon_phrase: phrase
      }
    }
  );

  pokemonData = [];

  pokemonData = await client.db("DB_Pokemons").collection("Pokemons").find<Pokemon>({}).toArray();

  res.redirect(`/pokemon/${pokemon.pokemon_id}`);
});

app.get('/login', (req, res) => {
  res.render('login', { pageTitle: "Login" });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.post("/login", async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    let user: User = await login(email, password);
    delete (user as User).password;
    req.session.user = user;
    req.session.message = { type: "success", message: "Login successful" };
    res.redirect("/");
  } catch (e: any) {
    req.session.message = { type: "error", message: e.message };
    res.redirect("/login");
  }
});

app.get('/register', (req, res) => {
  res.render('register', { pageTitle: "Register" });
});

app.post("/register", async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    const user: User | null = await register(email, password);
    if (user !== null) {
      delete (user as User).password;
      req.session.user = user;
      req.session.message = { type: "success", message: "Registration successful" };
      res.redirect("/login");
    } else {
      req.session.message = { type: "error", message: "Registration failed" };
      res.redirect("/register");
    }
  } catch (e: any) {
    req.session.message = { type: "error", message: e.message };
    res.redirect("/register");
  }
});

async function main() {
  try {
      console.log("Data loading...");
      const database = client.db("DB_Pokemons");
      // check if the collection is empty
      const pokemonsCheck = await database.collection("Pokemons").findOne({});
      const movesCheck = await database.collection("Moves").findOne({});

      if (!pokemonsCheck) {
          // fetch from api
          const pokemonResponse = await fetch('https://raw.githubusercontent.com/ajomoleprecious/filesForWebOntw/main/Pokemons.json');
          const pokemonsdata = await pokemonResponse.json();
          pokemonData.push(...pokemonsdata);

          await database.collection("Pokemons").insertMany(pokemonsdata);
      }

      if (!movesCheck) {

          const moveResponse = await fetch('https://raw.githubusercontent.com/ajomoleprecious/filesForWebOntw/main/Pokemon_moves.json');
          const movesdata = await moveResponse.json();
          moveData.push(...movesdata);

          // insert into database
          await database.collection("Moves").insertMany(movesdata);
      }

      // fetch from database
      pokemonData = await database.collection("Pokemons").find<Pokemon>({}).toArray();
      moveData = await database.collection("Moves").find<Move>({}).toArray();
      console.log("Data loaded");
  } catch (err) {
      console.error(err);
  }
}

/* Als route niet bestaat */
app.use((_, res) => {
  res.status(404);
  res.render('404', { pageTitle: "404 Not Found" });
});

app.listen(app.get('port'), async () => {
  console.log(`Server is running at http://localhost:${app.get('port')}`);
  await connect();
  main();
});

