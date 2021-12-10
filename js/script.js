'use strict';

const API_URL = 'https://cedar-quirky-rest.glitch.me/movies';

//Get All Movies
let getALLMovies = () => fetch(API_URL).then(resp => resp.json()).catch(err => console.error(err));
getALLMovies().then(data => console.log(data));

// GET REQUEST BY ID
let getMoviesById = (id) => {
	return fetch(`${API_URL}/${id}`).then(resp => resp.json()).catch(err => console.error(err))
}

// SHOULD RETURN ID 3
getMoviesById(3).then(data => console.log(data));

// EDIT A POST
let editMovies = (movie) => {
	let options = {
		method: 'PUT',
		headers: {
			// Content-Type - This tells the server what type of data we are sending with our request. When interacting with a JSN API, this will usually be application/json.
			'Content-Type': 'application/json',
		},
		// A request body - Additional content that is included along with our request, usually a JSON string that represents the resource(s) being created/modified.
		body: JSON.stringify(movie) // Convert the JS object into a JSON string before sending it to the server.
	}
	
	return fetch(`${API_URL}/${movie.id}`, options).then(resp => resp.json()).catch(err => console.error(err));
}

// If you use the PUT method, and only send an object with 2 of the existing properties, the entire object gets replaced, leaving you with only the properties you passed.
let editedMovie = {
	actors: '',
	director: '',
	rating: 9,
	year: '',
}
// editMovies(editedMovie).then(data => console.log(data));

// PUT VS PATCH
// PUT - requires you to resubmit the entire entity.
// PATCH - only edits properties that currently exist in the posted entity.


//POST REQUEST

let newMovie = {
	title: 'Avatar',
	rating: '10',
	id: 0,
}

let createdMovie = movie => {
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(movie)
	};
	 return fetch(API_URL, options).then(resp => resp.json()).catch(err => console.error(err));
}
createdMovie(newMovie).then(data => console.log(data));




