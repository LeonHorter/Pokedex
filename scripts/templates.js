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
                            <img src="${pokemonObj.sprites.other['official-artwork'].front_default}" class="pokemonImgSmall" alt="Pokémon-Bild" loading="lazy">
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
                            <input type="image" id="closeBtn" aria-label="close overlay" class="iconBtn" src="./assets/icons/close.svg" alt="close Overlay" tabindex="0" onclick="closeDialog()">
                        </div>
                        <div class="pokemonOverlayTitle">
                            <h2>${capitalizeFirstLetter(pokemonObj.name)}</h2>
                            <p>#${pokemonObj.id}</p>
                        </div>
                        <ul id="pokemonOverlayTypes_${pokemonObj.id}" class="pokemonOverlayTypes">
                        </ul>
                    </div>
                    <div class="pokemonOverlayImgBox">
                        <img src="${pokemonObj.sprites.other['official-artwork'].front_default}" class="pokemonImgLarge" alt="Pokémon-Bild">
                    </div>
                </header>
                <main class="pokemonOverlayMain">
                    <nav>
                        <ul class="pokemonOverlayNav">
                            <li><button id="aboutBtn" class="pokemonOverlayNavBtn navActive" onclick="showOverlayMainContent(this)">About</button><li>
                            <li><button id="statsBtn" class="pokemonOverlayNavBtn" onclick="showOverlayMainContent(this)">Base Stats</button></li>
                            <li><button id="evoBtn" class="pokemonOverlayNavBtn" onclick="showOverlayMainContent(this)">Evolution</button></li>
                            <li><button id="movesBtn" class="pokemonOverlayNavBtn" onclick="showOverlayMainContent(this)">Moves</button></li>
                        </ul>
                    </nav>
                    <div class="pokemonOverlayMainContent">
                        <section id="about" class="pokemonOverlaySection">
                            <table>
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
                        <section id="stats" class="pokemonOverlaySection dNone">
                            Base Stats
                        </section>
                        <section id="evo" class="pokemonOverlaySection dNone">
                            Evolution
                        </section>
                        <section id="moves" class="pokemonOverlaySection dNone">
                            Moves
                        </section>
                    </div>
                </main>
                <footer class="pokemonOverlayFooter">
                    <div>
                        <input type="image" id="prevPokemonBtn" aria-label="previous Pokémon" class="iconBtn arrowBtnLeft" src="./assets/icons/arrow-right.svg" alt="previous Pokémon" tabindex="0" onclick="showPrevPokemon(${pokemonObj.id})">
                    </div>
                    <div>
                        <input type="image" id="nextPokemonBtn" aria-label="next Pokémon" class="iconBtn" src="./assets/icons/arrow-right.svg" alt="next Pokémon" tabindex="0" onclick="showNextPokemon(${pokemonObj.id})">
                    </div>
                </footer>
            </div>`;
}