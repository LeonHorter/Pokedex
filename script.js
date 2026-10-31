const dialogRef = document.getElementById('pokemonOverlay');
const baseUrl = 'https://pokeapi.co/api/v2/';

let pokemonList = [];
let pokemonData = [];

async function renderCards() {
    let pokemonObj = await loadData(baseUrl + 'pokemon?limit=30&offset=0');
    let contentRef = document.getElementById('pokemonList');
    
    pokemonList = pokemonObj.results;
    
    for (let index = 0; index < pokemonList.length; index++) {
        pokemonData.push(await loadData(pokemonList[index].url));
        contentRef.innerHTML += getCardTemplate(index);
    }

    console.log(pokemonData);
}

async function loadData(path) {
    let response = await fetch(path);
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