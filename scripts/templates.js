function getCardTemplate(pokemonObj) {
    return `<li>
                <button class="pokemonCard bg_${pokemonObj.types[0].type.name}" data-id="card" onclick="openDialog(this)">
                    <header class="pokemonCardContent">
                        <h2>${capitalizeFirstLetter(pokemonObj.name)}</h2>
                        <p>#${String(pokemonObj.id).padStart(4, '0')}</p>
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
    return `<p>${capitalizeFirstLetter(pokemonTypeObj.name)}</p>`;
}