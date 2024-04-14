import express from 'express';
import { Pokemon } from './pokemon';
import { Move } from './move';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

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
  let filteredPokemonData = pokemonData.slice();

  // Filter by pokemon_name if provided
  if (req.query.pokemon_name) {
    const searchTerm = (req.query.pokemon_name as string).toLowerCase();
    filteredPokemonData = filteredPokemonData.filter(pokemon => pokemon.pokemon_name.toLowerCase().includes(searchTerm));
  }

  // Sort the filtered data if sortBy parameter is provided
  if (req.query.sortBy === 'name') {
    filteredPokemonData = sortPokemon(filteredPokemonData, 'pokemon_name', req.query.sortOrder as string);
  } else if (req.query.sortBy === 'birthdate') {
    filteredPokemonData = sortPokemon(filteredPokemonData, 'pokemon_birthdate', req.query.sortOrder as string);
  } else if (req.query.sortBy === 'weight') {
    filteredPokemonData = sortPokemon(filteredPokemonData, 'pokemon_weight', req.query.sortOrder as string);
  }

  res.render('index', { pageTitle: "Thuis", pokemons: filteredPokemonData, typeColors });
});

// Function to sort Pokemon array based on a given property and sorting order
function sortPokemon(pokemonArray: Pokemon[], sortBy: string, sortOrder: string): Pokemon[] {
  return pokemonArray.sort((a, b) => {
    if (sortOrder === 'asc') {
      if (sortBy === 'pokemon_birthdate') {
        return new Date((a as any)[sortBy]).getTime() - new Date((b as any)[sortBy]).getTime();
      } else {
        return ((a as any)[sortBy] > (b as any)[sortBy]) ? 1 : -1;
      }
    } else {
      if (sortBy === 'pokemon_birthdate') {
        return new Date((b as any)[sortBy]).getTime() - new Date((a as any)[sortBy]).getTime();
      } else {
        return ((b as any)[sortBy] > (a as any)[sortBy]) ? 1 : -1;
      }
    }
  });
}

const moveData: Move[] = [];
app.get('/moves', (req, res) => {
  let sortedMoveData = moveData.slice();

  if (req.query.sortBy === 'name') {
    sortedMoveData = sortMoves(sortedMoveData, 'move_name', req.query.sortOrder as string);
  } else if (req.query.sortBy === 'accuracy') {
    sortedMoveData = sortMoves(sortedMoveData, 'move_accuracy', req.query.sortOrder as string);
  } else if (req.query.sortBy === 'power') {
    sortedMoveData = sortMoves(sortedMoveData, 'move_power', req.query.sortOrder as string);
  }

  res.render('moves', { pageTitle: "Pokemon Moves", moves: sortedMoveData });
});

// Function to sort Moves array based on a given property and sorting order
function sortMoves(moveArray: Move[], sortBy: string, sortOrder: string): Move[] {
  return moveArray.sort((a, b) => {
    if (sortOrder === 'asc') {
      return (a as any)[sortBy] - (b as any)[sortBy];
    } else {
      return (b as any)[sortBy] - (a as any)[sortBy];
    }
  });
}

/* Als route niet bestaat */
app.use((_, res) => {
  res.status(404);
  res.render('404', { pageTitle: "404 Not Found" });
});

app.listen(app.get('port'), async () => {
  try {
    const pokemonResponse = await fetch('https://raw.githubusercontent.com/ajomoleprecious/filesForWebOntw/main/Pokemons.json');
    const data = await pokemonResponse.json();
    pokemonData.push(...data);

    const moveResponse = await fetch('https://raw.githubusercontent.com/ajomoleprecious/filesForWebOntw/main/Pokemon_moves.json');
    const movedata = await moveResponse.json();
    moveData.push(...movedata);
    
  } catch (err) {
    console.error(`Error fetching Pokemon data: ${err}`);
  }
  console.log(`Server running on port ${app.get('port')}`);
});
