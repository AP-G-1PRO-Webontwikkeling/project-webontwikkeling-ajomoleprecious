import * as readline from 'readline-sync';
import pokemonsFromJson from '../Pokemon.json';
import { Pokemon } from './pokemon';
import { Move } from './move';

const menuOptions: string[] = [
    "1. Show all Pokemons",
    "2. Filter Pokemons by id",
    "3. Exit"];

const fetchFromUrl = async () => {
    const response = await fetch('https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-ajomoleprecious/main/Pokemon.json');
    const data = await response.json();
    showSubMenu(data);
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

async function showSubMenu(data: Pokemon[]) {
    const pokemons: Pokemon[] = data;
    let subMenuOption = readline.keyInSelect(menuOptions,
        "Welcome to the Pokémon JSON data viewer. Choose an option: ",
        { cancel: false, guide: false });

    while (subMenuOption !== 2) {
        switch (subMenuOption) {
            case 0:
                ShowAllPokemons(pokemons);
                break;
            case 1:
                FilterPokemonsById(pokemons);
                break;
            default:
                console.log("Please choose a valid option.");
                break;
        }
        subMenuOption = readline.keyInSelect(menuOptions,
            "Welcome to the Pokémon JSON data viewer. Choose an option: ",
            { cancel: false, guide: false });
    }

}

fetchFromUrl();
