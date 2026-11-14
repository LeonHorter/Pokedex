const dialogRef = document.getElementById('pokemonOverlay');
const baseUrl = 'https://pokeapi.co/api/v2/';
const lightPokemonTypes = [
    "electric",
    "ice",
    "fairy"
];


let pokemonLinks = [];
let pokemonData = [];
let currentPokemonData = [];

async function loadPokemonData() {
    let response = await loadData(baseUrl + 'pokemon?limit=100000&offset=0');
    pokemonLinks = response.results;

    for (let index = 0; index < pokemonLinks.length; index++) {
        pokemonData.push(await loadData(pokemonLinks[index].url));
    }

    console.log(pokemonData);   // kann weg

    loadCards(40);
}

function loadCards(count) {
    let startIndex = currentPokemonData.length;
    let endIndex = startIndex + count;

    for (let index = startIndex; index < Math.min(endIndex, pokemonData.length); index++) {
        currentPokemonData[index] = pokemonData[index];
    }

    renderCards();
}

function renderCards() {
    let contentRef = document.getElementById('pokemonList');
    contentRef.innerHTML = '';

    for (let index = 0; index < currentPokemonData.length; index++) {
        contentRef.innerHTML += getCardTemplate(currentPokemonData[index]);
        renderPokemonTypes('pokemonCardTypes_', currentPokemonData[index]);
    }

    hideLoadMoreBtn();
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

async function loadData(path) {
    let response = await fetch(path);
    return responseToJson = await response.json();
}

function showNextPokemon(pokemonId) {
    let indexNextPokemon = pokemonData.findIndex(pokemon => pokemon.id == pokemonId) + 1;
    renderDialog(pokemonData[indexNextPokemon]);
}

function showPrevPokemon(pokemonId) {
    let indexPrevPokemon = pokemonData.findIndex(pokemon => pokemon.id == pokemonId) - 1;
    renderDialog(pokemonData[indexPrevPokemon]);
}

function hideLoadMoreBtn() {
    let contentRef = document.getElementById('loadMoreBtn');
    contentRef.classList.toggle('dNone', currentPokemonData.length === pokemonData.length);
}

function showOverlayMainContent(navBtn) {
    //remove 'Btn'-ending from navBtn-string
    let navId = navBtn.id.slice(0, -3);

    document.querySelectorAll('.pokemonOverlaySection').forEach(element => {
        element.classList.toggle('dNone', element.id !== navId);
    });

    document.querySelectorAll('.pokemonOverlayNavBtn').forEach(element => {
        element.classList.toggle('navActive', element.id == navBtn.id);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function decimeterToCentimeter(dm) {
    return dm * 10 + ' cm';
}

function hectogramToKilogram(hg) {
    return hg / 10 + ' kg';
}

function openDialog(pokemonCard) {
    let pokemonObj = pokemonData.find(pokemon => pokemon.id == pokemonCard.id);

    renderDialog(pokemonObj);
    dialogRef.showModal();
}

function renderDialog(pokemonObj) {
    dialogRef.innerHTML = getPokemonOverlayTemplate(pokemonObj);
    renderPokemonTypes('pokemonOverlayTypes_', pokemonObj);
    renderFirstLastDialog(pokemonObj);
    setCloseBtnFilter(pokemonObj.types);
}

function renderFirstLastDialog(pokemonObj) {
    let prevBtnContentRef = document.getElementById('prevPokemonBtn');
    let nextBtnContentRef = document.getElementById('nextPokemonBtn');

    prevBtnContentRef.classList.toggle('dNone', pokemonObj.id === 1);
    nextBtnContentRef.classList.toggle('dNone', pokemonObj.id === pokemonData.at(-1).id);
}

function setCloseBtnFilter(pokemonTypesObj) {
    let contentRef = document.getElementById('closeBtn');
    contentRef.classList.toggle('blackFilter', lightPokemonTypes.includes(pokemonTypesObj[0].type.name))
}

function closeDialog() {
    dialogRef.close();
}

function stopPropagation(event) {
    event.stopPropagation();
}