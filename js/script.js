'use strict';
/***************************** GET ALL MOVIES  ***********************************/
const API_URL = 'https://bird-showy-spur.glitch.me/movies';
let getALLMovies = () => fetch(API_URL)
.then(resp => resp.json())
.catch(err => console.error(err));
getALLMovies().then(data => console.log(data));

/*****************************  REQUEST BY ID  ***********************************/
let getMoviesById = (id) => {
	return fetch(`${API_URL}/${id}`)
	.then(resp => resp.json())
	.catch(err => console.error(err))
}
// SHOULD RETURN ID 3
// getMoviesById(3).then(data => console.log(data));

/**************** POST  Note: Duplication is allowed here.  **************/
let newMovie =     {
	"title": "B",
	"rating": "5",
	"poster": "https://m.media-amazon.com/images/M/MV5BYWMwMzQxZjQtODM1YS00YmFiLTk1YjQtNzNiYWY1MDE4NTdiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
	"year": "2001",
	"genre": "Drama, History, War",
	"director": "Ridley Scott",
	"plot": "160 elite U.S. soldiers drop into Somalia to capture two top lieutenants of a renegade warlord and find themselves in a desperate battle with a large force of heavily-armed Somalis.",
	"actors": "Josh Hartnett, Ewan McGregor, Tom Sizemore, Eric Bana",
	"id": 2
}

let createdMovie = movie => {
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(movie)
	};
	return fetch(API_URL, options)
		.then(resp => resp.json())
		.catch(err => console.error(err));
}
// createdMovie(newMovie).then(data => console.log(data));

/** EDIT A POST - PUT  is for checking if resource exists then update , else create new resource **/

let editedMovie = {
	"title": "Guardians of the Galaxy Vol. 2",
}
let editMovies = (movie) => {
	let options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(movie) // Convert the JS object into a JSON string before sending it to the server.
	}
	return fetch(`${API_URL}/${movie.id}`, options)
	.then(resp => resp.json())
	.catch(err => console.error(err));
}
// editMovies(editedMovie).then(data => console.log(data));

/***************************** PATCH is always for update a resource ***********************************/
let patchMovie = {
		"title": "Guardians of the Galaxy Vol. 2 ",
		"id": 5
	}
let patchMovies = (movie) => {
	let options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(patchMovie) // Convert the JS object into a JSON string before sending it to the server.
	}
	return fetch(`${API_URL}/${movie.id}`, options)
		.then(resp => resp.json())
		.catch(err => console.error(err));
}
// patchMovies(patchMovie).then(data => console.log(data));

/***************************** DELETE REQUEST  ***********************************/
let deleteMovie = (id) => {
	let options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	return fetch(`${API_URL}/${id}`, options)
		.then(resp => resp.json())
		.catch(err => console.error(err))
}
// deleteMovie()


/*****************************  ***********************************/
/*****************************  ***********************************/
/*****************************  ***********************************/

/**
On page load:
	
	Display a "loading..." message
Make an AJAX request to get a listing of all the movies
When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the json response your code receives

**/




// START APPENDING HTML =================================

// const loadingPromise = fetch(API_URL);
// const main = document.querySelector('.card');
// main.innerHTML = "<p>Loading....";
//
// loadingPromise.then(res => res.json()).then(movies => main.innerHTML = getALLMovies(movies));

// getALLMovies().then(data => console.log(data));
// }


//poster, title, plot, year, rating, actors, director


