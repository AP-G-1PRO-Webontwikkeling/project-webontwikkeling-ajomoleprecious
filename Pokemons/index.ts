import * as readline from 'readline-sync';
import { Pokemon } from './pokemon';
import { Move } from './move';

const menuOptions: string[] = [
    "Show all Pokemons",
    "Filter Pokemons by id",
    "Exit"];

const fetchFromUrl = async () => {
    const response = await fetch('https://raw.githubusercontent.com/ajomoleprecious/filesForWebOntw/main/Pokemons.json');
    const data = await response.json().catch(err => console.error(`Iets ging mis:\n ${err}`));
    showSubMenu(data as Pokemon[]);
}

function FilterPokemonsById(pokemons: Pokemon[]) {
    const pokemonId = readline.questionInt("Enter the id of the pokemon: ");
    const pokemon = pokemons.find(pokemon => pokemon.pokemon_id === pokemonId);
    if (pokemon) {
        console.log(`\n${'-'.repeat(125)}`);
        console.log(`${pokemon.pokemon_name} (${pokemon.pokemon_id})`);
        console.log(` - Pokemon Phrase: ${pokemon.pokemon_phrase}`);
        console.log(` - Pokemon Weight: ${pokemon.pokemon_weight}`);
        console.log(` - Is Pokemon Active: ${pokemon.is_pokemon_active ? "Yes" : "No"}`);
        console.log(` - Pokemon Birthdate: ${pokemon.pokemon_birthdate}`);
        console.log(` - Pokemon Image: ${pokemon.pokemon_url}`);
        console.log(` - Pokemon Type: ${pokemon.pokemon_type}`);
        console.log(` - Pokemon Abilities: ${pokemon.pokemon_abilities.map(ability => ability.ability).join(", ")}`);
        console.log(` - Pokemon Moves: ${showMoves(pokemon.pokemon_moves)}`);
        console.log(`${'-'.repeat(125)}\n`);
    } else {
        console.log(`\n${'-'.repeat(50)}`);
        console.log("Pokemon not found");
        console.log(`${'-'.repeat(50)}\n`);
    }
}

function showMoves(moves: Move[]) {
    return moves.map(move => `\n\t - ${move.move_name.toUpperCase()} (Accuracy: ${move.move_accuracy}) (Power: ${move.move_power})`).join("\n");
}

function ShowAllPokemons(pokemons: Pokemon[]) {
    pokemons.forEach(pokemon => {
        console.log(`${(pokemon.pokemon_name).padEnd(25)}\t(${pokemon.pokemon_id})`);
    });
}

function showSubMenu(pokemons: Pokemon[]) {
    let subMenuOption = readline.keyInSelect(menuOptions,
        "Welcome to the Pokémon JSON data viewer. Choose an option: ",{ cancel: false, guide: false });

    while (subMenuOption !== 2) {
        switch (subMenuOption) {
            case 0:
                ShowAllPokemons(pokemons);
                break;
            case 1:
                FilterPokemonsById(pokemons);
                break;
        }
        subMenuOption = readline.keyInSelect(menuOptions,
            "Welcome to the Pokémon JSON data viewer. Choose an option: ",
            { cancel: false, guide: false });
    }

}

fetchFromUrl();