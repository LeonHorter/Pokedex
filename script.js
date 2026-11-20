const dialogRef = document.getElementById('pokemonOverlay');
const baseUrl = 'https://pokeapi.co/api/v2/';
const lightPokemonTypes = [
    'electric',
    'ice',
    'fairy'
];
const statNames = [
    {
        'statName' : 'HP',
        'stat' : 'hp'
    },
    {
        'statName' : 'Attack',
        'stat' : 'attack'
    },
    {
        'statName' : 'Defense',
        'stat' : 'defense'
    },
    {
        'statName' : 'Special Attack',
        'stat' : 'special-attack'
    },
    {
        'statName' : 'Special Defense',
        'stat' : 'special-defense'
    },
    {
        'statName' : 'Speed',
        'stat' : 'speed'
    }
];

let pokemonLinks = [];
let pokemonData = [];
let currentPokemonData = [];
let currentNavId = 'about';

async function loadPokemonData() {
    let response = await loadData(baseUrl + 'pokemon?limit=100000&offset=0');
    pokemonLinks = response.results;

    loadCards();
}

async function loadCards() {
    showLoadingScreen();

    let startIndex = currentPokemonData.length;
    let endIndex = startIndex + 30;

    for (let index = startIndex; index < endIndex; index++) {
        pokemonData.push(await loadData(pokemonLinks[index].url));
    }

    currentPokemonData = pokemonData;
    renderCards();
    showLoadMoreBtn();
}

function showLoadingScreen() {
    hideLoadMoreBtn();

    let contentRef = document.getElementById('pokemonList');
    contentRef.innerHTML = getLoadingScreenTemplate();
}

function renderCards() {
    let contentRef = document.getElementById('pokemonList');
    contentRef.innerHTML = '';

    for (let index = 0; index < currentPokemonData.length; index++) {
        contentRef.innerHTML += getCardTemplate(currentPokemonData[index]);
        renderPokemonTypes('pokemonCardTypes_', currentPokemonData[index]);
    }
}

function renderPokemonTypes(contentElement, pokemonObj) {
    let contentRef = document.getElementById(contentElement + pokemonObj.id);

    for (let index = 0; index < pokemonObj.types.length; index++) {
        contentRef.innerHTML += getTypesTemplate(pokemonObj.types[index].type);
    }
}

function searchPokemon(term) {
    hideLoadMoreBtn();

    currentPokemonData = pokemonData.filter(pokemon => pokemon.name.includes(term.toLowerCase()));
    
    if (currentPokemonData.length === 0) {
        let contentRef = document.getElementById('pokemonList');
        contentRef.innerHTML = getNoMatchFoundTemplate();
    } else {
        renderCards();
    }
}

searchField.addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim();

    if (searchTerm.length >= 3) {
        searchPokemon(searchTerm);
    } else if (searchTerm.length === 0) {
        loadCardsAfterSearch();
    }
});

function loadCardsAfterSearch() {
    currentPokemonData = pokemonData;

    renderCards();
    showLoadMoreBtn();
}

function renderPokemonAbilities(pokemonAbilitiesObj) {
    let abilities = [];

    for (let index = 0; index < pokemonAbilitiesObj.length; index++) {
        let ability = capitalizeFirstLetter(pokemonAbilitiesObj[index].ability.name);
        abilities.push(ability);
    }

    return abilities.join(', ');
}

function renderPokemonStats(pokemonStatsObj) {
    let contentRef = document.getElementById('statsTable');

    for (let index = 0; index < statNames.length; index++) {
        let statObj = pokemonStatsObj.find(statEl => statEl.stat.name == statNames[index].stat);
        let baseStat = statObj.base_stat;
        
        contentRef.innerHTML += getStatsTemplate(statNames[index], baseStat);
    }
}

async function loadData(path) {
    let response = await fetch(path);
    return responseToJson = await response.json();
}

function showNextPokemon(pokemonId) {
    let indexNextPokemon = currentPokemonData.findIndex(pokemon => pokemon.id == pokemonId) + 1;
    renderDialog(currentPokemonData[indexNextPokemon]);
}

function showPrevPokemon(pokemonId) {
    let indexPrevPokemon = currentPokemonData.findIndex(pokemon => pokemon.id == pokemonId) - 1;
    renderDialog(currentPokemonData[indexPrevPokemon]);
}

function hideLoadMoreBtn() {
    let contentRef = document.getElementById('loadMoreBtn');
    contentRef.classList.add('dNone');
}

function showLoadMoreBtn() {
    let contentRef = document.getElementById('loadMoreBtn');
    contentRef.classList.remove('dNone');
}

function showOverlayMainContent(navId) {
    document.querySelectorAll('.pokemonOverlaySection').forEach(element => {
        element.classList.toggle('dNone', element.id !== navId);
    });

    document.querySelectorAll('.pokemonOverlayNavBtn').forEach(element => {
        element.classList.toggle('navActive', element.id == navId);
    });

    currentNavId = navId;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function openDialog(pokemonCard) {
    let pokemonObj = currentPokemonData.find(pokemon => pokemon.id == pokemonCard.id);

    renderDialog(pokemonObj);
    dialogRef.showModal();
}

function renderDialog(pokemonObj) {
    dialogRef.innerHTML = getPokemonOverlayTemplate(pokemonObj);
    renderPokemonTypes('pokemonOverlayTypes_', pokemonObj);
    renderPokemonStats(pokemonObj.stats);
    showOverlayMainContent(currentNavId);
    renderFirstLastDialog(pokemonObj);
    setCloseBtnFilter(pokemonObj.types);
}

function renderFirstLastDialog(pokemonObj) {
    let prevBtnContentRef = document.getElementById('prevPokemonBtn');
    let nextBtnContentRef = document.getElementById('nextPokemonBtn');

    prevBtnContentRef.classList.toggle('dNone', pokemonObj.id === currentPokemonData[0].id);
    nextBtnContentRef.classList.toggle('dNone', pokemonObj.id === currentPokemonData.at(-1).id);
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