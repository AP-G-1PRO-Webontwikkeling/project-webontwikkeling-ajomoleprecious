import readline from 'readline-sync';

let pokemons = fetch('https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-ajomoleprecious/main/Pokemon.json').then(response => response.json());


function showPokemon(data : any) {
    console.log(data);
}
pokemons.then(data => {
    showPokemon(data);
});


