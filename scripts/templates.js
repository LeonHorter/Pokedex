function getCardTemplate(pokemonObj) {
    return `<li>
                <button id="${pokemonObj.id}" class="pokemonCard bg_${pokemonObj.types[0].type.name}" data-id="card" onclick="openDialog(this)">
                    <header class="pokemonCardContent">
                        <h3>${truncateText(capitalizeFirstLetter(pokemonObj.name), 15)}</h3>
                        <p>#${pokemonObj.id}</p>
                    </header>
                    <div class="pokemonCardContent">
                        <ul id="pokemonCardTypes_${pokemonObj.id}" class="pokemonCardTypes">
                        </ul>
                        <div class="pokemonCardImgBox">
                            <img src="${pokemonObj.sprites.other['official-artwork'].front_default}" data-id="card-image" class="pokemonImgSmall" alt="Pokémon-Bild" loading="lazy">
                        </div>
                    </div>
                </button>
            </li>`;
}

function getTypesTemplate(pokemonTypeObj) {
    return `<li class="pokemonType">${capitalizeFirstLetter(pokemonTypeObj.name)}</li>`;
}

function getPokemonOverlayTemplate(pokemonObj) {
    return `<div class="pokemonOverlayContent bg_${pokemonObj.types[0].type.name}" onclick="stopPropagation(event)">
                <header class="pokemonOverlayHeader">
                    <div class="pokemonOverlayHeaderTop">
                        <div class="pokemonOverlayClose">
                            <input type="image" id="closeBtn" data-id="close-dialog-button" aria-label="close overlay" class="iconBtn" src="./assets/icons/close.svg" alt="close Overlay" tabindex="0" onclick="closeDialog()">
                        </div>
                        <div class="pokemonOverlayTitle">
                            <h2 data-id="overlay-pokemon-name">${capitalizeFirstLetter(pokemonObj.name)}</h2>
                            <p>#${pokemonObj.id}</p>
                        </div>
                        <ul id="pokemonOverlayTypes_${pokemonObj.id}" class="pokemonOverlayTypes">
                        </ul>
                    </div>
                    <div class="pokemonOverlayImgBox">
                        <img src="${pokemonObj.sprites.other['official-artwork'].front_default}" data-id="dialog-image" class="pokemonImgLarge" alt="Pokémon-Bild">
                    </div>
                </header>
                <main class="pokemonOverlayMain">
                    <nav>
                        <ul class="pokemonOverlayNav">
                            <li><button id="about" class="pokemonOverlayNavBtn" onclick="showOverlayMainContent('about')">About</button></li>
                            <li><button id="stats" class="pokemonOverlayNavBtn" onclick="showOverlayMainContent('stats')">Base Stats</button></li>
                        </ul>
                    </nav>
                    <div class="pokemonOverlayMainContent">
                        <section id="about" class="pokemonOverlaySection">
                            <table class="aboutTable">
                                <tr>
                                    <th>Species</th>
                                    <td>${capitalizeFirstLetter(pokemonObj.species.name)}</td>
                                </tr>
                                <tr>
                                    <th>Height</th>
                                    <td>${decimeterToCentimeter(pokemonObj.height)}</td>
                                </tr>
                                <tr>
                                    <th>Weight</th>
                                    <td>${hectogramToKilogram(pokemonObj.weight)}</td>
                                </tr>
                                <tr>
                                    <th>Abilities</th>
                                    <td>${renderPokemonAbilities(pokemonObj.abilities)}</td>
                                </tr>
                            </table>
                        </section>
                        <section id="stats" class="pokemonOverlaySection">
                            <table id="statsTable" class="statsTable">
                            </table>
                        </section>
                    </div>
                </main>
                <footer class="pokemonOverlayFooter">
                    <div>
                        <input type="image" id="prevPokemonBtn" data-id="prev-button" aria-label="previous Pokémon" class="iconBtn arrowBtnLeft" src="./assets/icons/arrow-right.svg" alt="previous Pokémon" tabindex="0" onclick="showPrevPokemon(${pokemonObj.id})">
                    </div>
                    <div>
                        <input type="image" id="nextPokemonBtn" data-id="next-button" aria-label="next Pokémon" class="iconBtn" src="./assets/icons/arrow-right.svg" alt="next Pokémon" tabindex="0" onclick="showNextPokemon(${pokemonObj.id})">
                    </div>
                </footer>
            </div>`;
}

function getStatsTemplate(statNamesObj, value) {
    return `<tr>
                <th>${statNamesObj.statName}</th>
                <td class="progressCell">
                    <label for="${statNamesObj.stat + 'Progress'}">${value}</label>
                </td>
                <td>
                    <progress id="${statNamesObj.stat + 'Progress'}" value="${value}" max="180"></progress>
                </td>
            </tr>`;
}