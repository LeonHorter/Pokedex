const dialogRef = document.getElementById('pokemonOverlay');
const baseUrl = 'https://pokeapi.co/api/v2/';

let pokemonData = [];

async function renderCards() {
    let contentRef = document.getElementById('pokemonList');
    
    for (let pokemonId = 1; pokemonId <= 30; pokemonId++) {
        pokemonData.push(await loadData('pokemon/' + pokemonId));
        contentRef.innerHTML += getCardTemplate(pokemonData[pokemonId - 1]);
        renderPokemonTypes(pokemonData[pokemonId - 1]);
    }

    console.log(pokemonData);
}

function renderPokemonTypes(pokemon) {
    let contentRef = document.getElementById('pokemonTypes_' + pokemon.id);

    for (let index = 0; index < pokemon.types.length; index++) {
        contentRef.innerHTML += getTypesTemplate(pokemon.types[index].type);
    }
}

async function loadData(path = '') {
    let response = await fetch(baseUrl + path);
    return responseToJson = await response.json();
}

function openDialog(element) {
    dialogRef.showModal();
}

function closeDialog() {
    dialogRef.close();
}

function stopPropagation(event) {
    event.stopPropagation();
}