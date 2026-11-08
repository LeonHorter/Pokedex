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
    renderPokemonTypes('pokemonCardTypes_', pokemonObj);
}

function renderPokemonTypes(contentElement, pokemonObj) {
    let contentRef = document.getElementById(contentElement + pokemonObj.id);

    for (let index = 0; index < pokemonObj.types.length; index++) {
        contentRef.innerHTML += getTypesTemplate(pokemonObj.types[index].type);
    }
}

function renderPokemonAbilities(pokemonAbilitiesObj) {
    let abilities = [];

    for (let index = 0; index < pokemonAbilitiesObj.length; index++) {
        let ability = capitalizeFirstLetter(pokemonAbilitiesObj[index].ability.name);
        abilities.push(ability);
    }

    return abilities.join(', ');
}

async function loadData(path = '') {
    let response = await fetch(baseUrl + path);
    return responseToJson = await response.json();
}

function showNextPokemon(pokemonId) {
    let indexNextPokemon = pokemonId;
    renderDialog(pokemonData[indexNextPokemon]);
}

function showPrevPokemon(pokemonId) {
    let indexPrevPokemon = pokemonId - 2;
    renderDialog(pokemonData[indexPrevPokemon]);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function decimeterToCentimeter(dm) {
    return dm * 10 + ' cm';
}

function hectogramToKilogram(hg) {
    return hg / 10 + ' kg';
}

function openDialog(pokemonCard) {
    let pokemonObj = pokemonData[pokemonCard.id - 1];

    renderDialog(pokemonObj);
    dialogRef.showModal();
}

function renderDialog(pokemonObj) {
    dialogRef.innerHTML = getPokemonOverlayTemplate(pokemonObj);
    renderPokemonTypes('pokemonOverlayTypes_', pokemonObj);
}

function closeDialog() {
    dialogRef.close();
}

function stopPropagation(event) {
    event.stopPropagation();
}