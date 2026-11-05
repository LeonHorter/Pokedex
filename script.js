const dialogRef = document.getElementById('pokemonOverlay');
const baseUrl = 'https://pokeapi.co/api/v2/';

let pokemonData = [];

async function loadCards(count) {
    let startIndex = pokemonData.length;

    for (let pokemonId = startIndex + 1; pokemonId < startIndex + 1 + count; pokemonId++) {
        pokemonData.push(await loadData('pokemon/' + pokemonId));
        renderCards(pokemonData[pokemonId - 1]);
    }

    console.log(pokemonData);
}

function renderCards(pokemonObj) {
    let contentRef = document.getElementById('pokemonList');

    contentRef.innerHTML += getCardTemplate(pokemonObj);
    renderPokemonTypes(pokemonObj);
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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