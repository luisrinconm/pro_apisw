$('#modal1').modal();
//Direcciona a donde esta el JSON con la información de las peliculas
fetch(`https://swapi.co/api/films/`).then(function (data) {
    data.json().then(allFilms)
}).catch(function (err) {
    console.log(err);
})

//Función trae toda las peliculas con el resto de información incluyendo portada
function allFilms(data) {
    //console.log(data);
    let films = data.results;
    let tablahtml1 = ` `;
    let listCharacters = ` `;
    let listnaves=` `;
    let listplanets = ` `;
    let listespecies = ` `;
    let listvehiculos = ` `;
    let codigohtml1 = `<table class="table  table-bordered">
    <thead>
        <tr>
            <th>Titulo de Pelicula.</th>
            <th>Portada.</th>
            <th>Episodio.</th>
            <th>Personajes.</th>
            <th>Planetas.</th>
            <th>Naves.</th>
            <th>Vehiculos.</th>
            <th>Especies.</th>
        </tr>
    </thead>
    <tbody>`;
    let piehtml = `</tbody>
    </table>`;
    films.forEach(function (film, index) {
        let title = film.title;//Titulo de la Pelicula
        let episode = film.episode_id;//Episidio
        let characters = film.characters;//Personajes
        let planetas = film.planets;//Planetas
        let naves =film.starships;//Naves
        let vehiculos= film.vehicles;//Vehiculos
        let especies = film.species;//Especies
        let personaje = '';

        let ArregloPeliculas = [
            './assets/portada1.jpg',
            './assets/portada2.jpg',
            './assets/portada3.jpg',
            './assets/portada4.jpg',
            './assets/portada5.jpg',
            './assets/portada6.jpg',
            './assets/portada7.jpg'
        ]

        let films = ArregloPeliculas[index];
        //console.log(film);
        //charactersRequest(characters);

        //forEach anidado
        naves.forEach(function(n){
            listnaves += `<a href="${n}">
            <li class="planets-list" data-character="${n}">${n}</li>
            </a>`
        })
        vehiculos.forEach(function(v){
            listvehiculos += `<a href="${v}">
            <li class="planets-list" data-character="${v}">${v}</li>
            </a>`
        })
        especies.forEach(function(es){
            listespecies += `<a href="${es}">
            <li class="planets-list" data-character="${es}">${es}</li>
            </a>`
        })
        planetas.forEach(function(p){
            listplanets += `<a href="#modal2" class="modal-trigger">
            <li class="planets-list" data-character="${p}">${p}</li>
            </a>`
        })
        characters.forEach(function (person) {            
            listCharacters += `<a href="#modal1" class="modal-trigger" >
            <li class="character-list" data-character="${person}">${person}</li>
      </a>`
        })

        tablahtml1 +=
            `<tr>
                    <td>${title}</td>
                    <td><img src="${films}" alt="Elemento de Descarga" width="180px" height="280px" /></td>
                    <td>${episode}</td>
                    <td><ul class="center" id="characters">${listCharacters}</ul></td>
                    <td><ul class="center" id="planets">${listplanets}</ul></td>
                    <td><ul class="center" id="planets">${listnaves}</ul></td>
                    <td><ul class="center" id="planets">${listvehiculos}</ul></td>
                    <td><ul class="center" id="planets">${listespecies}</ul></td>
                </tr>            
        `

    })
    let filmsContainer = document.getElementById("films");
    filmsContainer.innerHTML = codigohtml1 + tablahtml1 + piehtml;
    let liCollectionHtml = document.getElementsByClassName("character-list"); //collecion de li
    getPersonaje(liCollectionHtml);   
}
function getPersonaje(liCollectionHtml) {
    //convertimos la coleccion de li en un array
    let liCharacter = Array.from(liCollectionHtml);   
    liCharacter.forEach(function (li) {
        li.addEventListener("click", getDetailsCharacters);
    })
}
function getDetailsCharacters(e) {
    e.preventDefault;
    let characterUrl = e.target.dataset.character;
    //console.log(characterUrl);
    //console.log(e.target.value);
    //segundo request para sacar info de cada uno de los personajes
    fetch(characterUrl).then(function (response) {
        response.json().then(function (result) {
            MostrarModal1(result);
            
        })
    })
}
function MostrarModal1(item) {
    
    $("#name").html("Name: " + item.name);
    $("#height").html("Height: " + item.height);
    $("#hair-color").html("Hair color: " + item.hair_color);
    $("#mass").html("Mass: " + item.mass);
    $("#skin-color").html("Skin color: " + item.skin_color);    
    console.log(document.getElementById("modal1"))
}

