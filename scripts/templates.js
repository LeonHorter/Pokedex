function getCardTemplate(index) {
    return `<li>
                <button class="pokemonCard" data-id="card" onclick="openDialog(this)">
                    <h2>${pokemonData[index].name}</h2>
                    <p>Type1</p>
                    <p>Type2</p>
                    <p>#${pokemonData[index].id}</p>
                </button>
            </li>`;
}