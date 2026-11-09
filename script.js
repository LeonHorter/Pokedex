const dialogRef = document.getElementById('pokemonOverlay');
const baseUrl = 'https://pokeapi.co/api/v2/';

let pokemonData = [];
let pokemonCount = '';  // kann weg
// neues Array [pokemonLinks] mit allen Pokemon-Links

async function getPokemonCount() {
    let response = loadData('pokemon');
    pokemonCount = response.count;
}

async function loadCards(count) {
    let startIndex = pokemonData.length + 1;    // startIndex = .length

    for (let pokemonId = startIndex; pokemonId < startIndex + count; pokemonId++) { // Schleife über pokemonLinks[index] von index = startIndex bis < startIndex + count
        pokemonData.push(await loadData('pokemon/' + pokemonId));   // loadData(pokemonLinks[index].url)
        renderCards(pokemonData[pokemonId - 1]);    // renderCards(pokemonData[pokemonData[index])
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

function showNextPokemon(pokemonId) {   // pokemonObj übergeben
    let indexNextPokemon = pokemonId;   // pokemonObj.name suchen in pokemonData; nächstes pokemonObj auslesen
    renderDialog(pokemonData[indexNextPokemon]);    // nächstes pokemonObj übergeben renderDialog(nextPokemonObj)
}

function showPrevPokemon(pokemonId) {   // pokemonObj übergeben
    let indexPrevPokemon = pokemonId - 2;   // pokemonObj.name suchen in pokemonData; vorheriges pokemonObj auslesen
    renderDialog(pokemonData[indexPrevPokemon]);    // vorheriges pokemonObj übergeben renderDialog(prevPokemonObj)
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
    renderFirstLastDialog(pokemonObj);
}

function renderFirstLastDialog(pokemonObj) {
    let prevBtnContentRef = document.getElementById('prevPokemonBtn');
    let nextBtnContentRef = document.getElementById('nextPokemonBtn');

    switch (pokemonObj.id) {
        case 1:
            prevBtnContentRef.classList.add('dNone');
            nextBtnContentRef.classList.remove('dNone');
            break;
        case pokemonCount:
            prevBtnContentRef.classList.remove('dNone');
            nextBtnContentRef.classList.add('dNone');
            break;
        default:
            prevBtnContentRef.classList.remove('dNone');
            nextBtnContentRef.classList.remove('dNone');
            break;
    }
}

function closeDialog() {
    dialogRef.close();
}

function stopPropagation(event) {
    event.stopPropagation();
}