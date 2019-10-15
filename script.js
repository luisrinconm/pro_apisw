
content = document.getElementById('content')

const conexion = () => {
    URL = `https://swapi.co/api/films/`;
    fetch(URL)
     	.then(response => response.json())
      	.then(response =>{
        response.results.forEach(e=>{
         	drawFilm(e);
        });
    });
      
}

const drawFilm = e =>{
    const film =`
    <table>
	<tr><td align="center">
		<h4>${e.title}</h4>
        <img src="assets/films/${e.episode_id}.jpg" alt="imagen portada" height="100" >
    </td></tr>
    </table>
 	`;
  	content.insertAdjacentHTML('beforeEnd', film);
};

conexion();
