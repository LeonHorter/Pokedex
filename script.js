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

    loadCards(40);
}

async function loadCards(count) {
    let startIndex = currentPokemonData.length;
    let endIndex = startIndex + count;

    for (let index = startIndex; index < endIndex; index++) {
        pokemonData.push(await loadData(pokemonLinks[index].url));
        currentPokemonData[index] = pokemonData[index];
    }

    console.log(pokemonData);   // kann weg

    renderCards();
}

function renderCards() {
    let contentRef = document.getElementById('pokemonList');
    contentRef.innerHTML = '';

    for (let index = 0; index < currentPokemonData.length; index++) {
        contentRef.innerHTML += getCardTemplate(currentPokemonData[index]);
        renderPokemonTypes('pokemonCardTypes_', currentPokemonData[index]);
    }

    // toggleLoadMoreBtn();
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

// function toggleLoadMoreBtn() {
//     let contentRef = document.getElementById('loadMoreBtn');
//     contentRef.classList.toggle('dNone');
// }

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

function decimeterToCentimeter(dm) {
    return dm * 10 + ' cm';
}

function hectogramToKilogram(hg) {
    return hg / 10 + ' kg';
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