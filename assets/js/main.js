const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <span class="name" style="display:none;">${pokemon.height}</span>
            <span class="name" style="display:none;">${pokemon.weight}</span>
            <span class="name" style="display:none;">${pokemon.moves}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <button class="btn show-modal-button" data-toggle="modal" data-target="#modal" data-pokemon-moves="${pokemon.moves}" data-pokemon-weight="${pokemon.weight}" data-pokemon-height="${pokemon.height}" data-pokemon-name="${pokemon.name}">Detalhes</button>
        </li>
        
    `;
}

function showPokemonDetails(pokemonName, pokemonHeight, pokemonWeight, pokemonMoves) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
            <h5>Nome:</h5><label style="text-transform: uppercase; color:#666666;">${pokemonName}</label>
            <h5>Altura:</h5><label style="text-transform: uppercase; color:#666666;"> ${pokemonHeight} M</label>
            <h5>Peso:</h5> <label style="text-transform: uppercase; color:#666666;">${pokemonWeight} Kg</label>
            <h5>Movimentos:</h5> <label style="text-transform: uppercase; color:#666666;">${pokemonMoves}</label>
        `;
}

pokemonList.addEventListener('click', (event) => {
    if (event.target.classList.contains('show-modal-button')) {
        const pokemonName = event.target.getAttribute('data-pokemon-name');
        const pokemonHeight = event.target.getAttribute('data-pokemon-height');
        const pokemonWeight = event.target.getAttribute('data-pokemon-weight');
        const pokemonMoves = event.target.getAttribute('data-pokemon-moves');
        showPokemonDetails(pokemonName, pokemonHeight, pokemonWeight, pokemonMoves);
        $('#modal').modal('show');
    }
    
});

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}


loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
