//import readline from 'readline-sync';
import pokemonsFromJson from '../Pokemon.json';

let pokemonsFromFetch = fetch('https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-ajomoleprecious/main/Pokemon.json').then(response => response.json());

const fetchFromUrl = async () => {
    const response = await fetch('https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-ajomoleprecious/main/Pokemon.json');
    const data = await response.json();
    return data;
}

const fetchFromFile = async () => {
    return pokemonsFromFetch;
}

function showPokemon(data: any) {
    console.log(data);
}

Promise.race([fetchFromUrl(), fetchFromFile()]).then(data => {
    showPokemon(data);
});

