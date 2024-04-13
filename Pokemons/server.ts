import express from 'express';
import { Pokemon } from './pokemon';
import { Move } from './move';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use(express.static('public', { extensions: ['html'] }));

app.set('view engine', 'ejs');

app.use(express.json({ limit: '1mb' }));

const pokemonData: Pokemon[] = [];
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

app.get('/', (req, res) => {
  let sortedPokemonData = pokemonData.slice();

  if (req.query.sortBy === 'name') {
    sortedPokemonData = sortedPokemonData.sort((a, b) => a.pokemon_name.localeCompare(b.pokemon_name));
    res.render('index', { pageTitle: "Thuis", pokemons: sortedPokemonData, typeColors });
  } else if (req.query.sortBy === 'birthdate') {
    sortedPokemonData = sortedPokemonData.sort((a, b) => new Date(a.pokemon_birthdate).getTime() - new Date(b.pokemon_birthdate).getTime());
    res.render('index', { pageTitle: "Thuis", pokemons: sortedPokemonData, typeColors });
  } else if (req.query.sortBy === 'weight') {
    sortedPokemonData = sortedPokemonData.sort((a, b) => a.pokemon_weight - b.pokemon_weight);
    res.render('index', { pageTitle: "Thuis", pokemons: sortedPokemonData, typeColors });
  }
  else if(req.query.pokemon_name) {
    const searchTerm = req.query.pokemon_name.toString().toLowerCase();
    const filteredPokemonData = pokemonData.filter(pokemon => pokemon.pokemon_name.toLowerCase().includes(searchTerm));
    res.render('index', { pageTitle: "Thuis", pokemons: filteredPokemonData, typeColors });
  }
  else {
    res.render('index', { pageTitle: "Thuis", pokemons: pokemonData, typeColors });
  }
});


/*app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const pokemon = pokemonData.find(pokemon => pokemon.pokemon_id === parseInt(id));
  if (pokemon) {
    res.render('pokemon', { pageTitle: pokemon.pokemon_name, pokemon });
  } else {
    res.status(404);
    res.render('404', { pageTitle: "404 Not Found" });
  }
});*/

const moveData: Move[] = [];
app.get('/moves', (req, res) => {
  let sortedMoveData = moveData.slice();

  if (req.query.sortBy === 'name') {
    sortedMoveData = sortedMoveData.sort((a, b) => a.move_name.localeCompare(b.move_name));
    res.render('moves', { pageTitle: "Pokemon Moves", moves: sortedMoveData });
  } else if (req.query.sortBy === 'accuracy') {
    sortedMoveData = sortedMoveData.sort((a, b) => a.move_accuracy - b.move_accuracy);
    res.render('moves', { pageTitle: "Pokemon Moves", moves: sortedMoveData });
  } else if (req.query.sortBy === 'power') {
    sortedMoveData = sortedMoveData.sort((a, b) => a.move_power - b.move_power);
    res.render('moves', { pageTitle: "Pokemon Moves", moves: sortedMoveData });
  } else {
    res.render('moves', { pageTitle: "Pokemon Moves", moves: moveData });
  }
});


/* Als route niet bestaat */
app.use((_, res) => {
  res.status(404);
  res.render('404', { pageTitle: "404 Not Found" });
});

app.listen(app.get('port'), async () => {
  try {
    const pokemonResponse = await fetch('https://raw.githubusercontent.com/ajomoleprecious/filesForWebOntw/main/Pokemons.json');
    const data = await pokemonResponse.json();
    data.forEach((pokemon: Pokemon) => {
      pokemonData.push(pokemon);
    })

    const moveResponse = await fetch('https://raw.githubusercontent.com/ajomoleprecious/filesForWebOntw/main/Pokemon_moves.json');
    const movedata = await moveResponse.json();
    movedata.forEach((move: Move) => {
      moveData.push(move);
    })
  } catch (err) {
    console.error(`Error fetching Pokemon data: ${err}`);
  }
  console.log(`Server running on port ${app.get('port')}`);
});