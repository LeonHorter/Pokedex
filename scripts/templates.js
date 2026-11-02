function getCardTemplate(pokemonObj) {
    return `<li>
                <button class="pokemonCard" data-id="card" onclick="openDialog(this)">
                    <header class="pokemonCardContent">
                        <h2>${pokemonObj.name}</h2>
                        <p>#${pokemonObj.id}</p>
                    </header>
                    <div class="pokemonCardContent">
                        <div id="pokemonTypes_${pokemonObj.id}" class="pokemonCardTypes">
                        </div>
                        <img src="${pokemonObj.sprites.other['official-artwork'].front_default}" class="pokemonImgSmall" alt="Pokémon-Bild" loading="lazy">
                    </div>
                </button>
            </li>`;
}

function getTypesTemplate(pokemonTypeObj) {
    return `<p>${pokemonTypeObj.name}</p>`;
}