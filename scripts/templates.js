function getCardTemplate(pokemonObj) {
    return `<li>
                <button class="pokemonCard" data-id="card" onclick="openDialog(this)">
                    <h2>${pokemonObj.name}</h2>
                    <div id="pokemonTypes_${pokemonObj.id}">
                    </div>
                    <p>#${pokemonObj.id}</p>
                </button>
            </li>`;
}

function getTypesTemplate(pokemonTypeObj) {
    return `<p>${pokemonTypeObj.name}</p>`;
}