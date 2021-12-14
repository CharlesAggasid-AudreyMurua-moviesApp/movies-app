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
	"title": "Movie",
	"id:": 6
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
		"title": "Black Hawk Down",
		"id": 2
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


	// var
	const url = "https://bird-showy-spur.glitch.me/movies"
	const mainRow = $('.main-row')
	const loading = $('.loading')
	const addBtn = $('#addMovie')
	let movieModal = $('.modal-div')
	let movieHTML = ""
	let modalHTML = ""
	
	const getAllMovie = (delay) => {
		$('.loading-container').css('margin-top', '150px')
		loading.toggle('hidden')
		mainRow.toggle('hidden')
		setTimeout(function(){
			fetch(url)
				.then(res => res.json())
				.then(data => {
					renderHTML(data);
				})
				.then($('.loading-container').css('margin-top', '0'))
				.then(loading.toggle('hidden'))
				.then(mainRow.toggle('hidden'))
				.catch(error => console.error(error))
		}, delay)
	}

	const renderHTML = data => {
	movieHTML = ""
	modalHTML = ""
	createModal(data)
	
	for(let ele of data) {
		movieHTML += `<div class="col-12 col-md-4 col-lg-3 movie-columns">
                            <div class="card" style="width: 18rem;">
                                <img id="movie${ele.id}" src="${ele.poster}" class="card-img-top" alt="Movie Poster" style="height: 100%; width: auto">
                                <div class="info${ele.id} hidden">
                                <div class="card-body">
                                <h5 class="card-title">${ele.title}</h5>
                                <p class="card-text">${ele.plot}</p>
                                <p class="card-text">Rating: ${ele.rating}</p>
                                <p class="card-text">Release Year: ${ele.year}</p>
                                <p class="card-text">Genres: ${ele.genre}</p>
                                <button class="btn-block btn btn-warning edit-data${ele.id}" data-toggle="modal" data-target="#editModal${ele.id}">Edit</button>
																<div id="delete${ele.id}"><i class="far fa-times-circle"></i></div>
                            </div></div></div></div>`
	}
		const deleteOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		 mainRow.html(movieHTML)
	/**************** DELETE MOVIE ITERATE*****************/
	for(let ele of data) {
		$(`#delete${ele.id}`).click(function () {
			$(`#delete${ele.id}`).attr('disabled')
			// DELETE FETCH
			// if(userDelete){
				fetch(`${url}/${ele.id}`, deleteOptions)
					.then(res => res.json())
					.then(data => console.log(data))
					.then(getAllMovie(2000))
					.then($(`#delete${ele.id}`).removeAttr('disabled'))
					.catch(error => console.error(error))
		})
		$(`#editMovie${ele.id}`).click(function () {
			$(`#editMovie${ele.id}`).attr('disabled');
			let userTitle = $(`#titleInput${ele.id}`).val()
			let userRating = $(`#ratingSelect${ele.id}`).val()
			let userYear = $(`#yearInput${ele.id}`).val()
			let userGenre = $(`#genreInput${ele.id}`).val()
			let userPlot = $(`#plotInput${ele.id}`).val()
			let userPoster =$(`#posterInput${ele.id}`).val()
			let userMovie = {
				title: userTitle,
				rating: userRating,
				year: userYear,
				genre: userGenre,
				plot: userPlot,
				poster: userPoster
			}
			const patchOptions = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userMovie)
			}
			fetch(`${url}/${ele.id}`, patchOptions)
				.then(res => res.json())
				.then(data => console.log(data))
				.then(getAllMovie(2000))
				.then($(`#editMovie${ele.id}`).removeAttr('disabled'))
				.catch(error => console.error(error))
		})
		$(`#movie${ele.id}`).click(function(){
			$(`.info${ele.id}`).toggle('hidden')
			$(`#movie${ele.id}`).toggle('hidden')
		})
		$(`.info${ele.id}`).click(function(){
			$(`.info${ele.id}`).toggle('hidden')
			$(`#movie${ele.id}`).toggle('hidden')
		})
	}
}

	const createModal = data => {
	for(let ele of data) {
		modalHTML += `<div class="modal fade" id="editModal${ele.id}" tabindex="-1" role="dialog" aria-labelledby="${ele.id}ModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                            <h5 class="modal-title" id="${ele.id}ModalLabel">Edit ${ele.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                   </div>
                           <div class="modal-body">
                                     <input id="titleInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" value="${ele.title}">
                                        <input id="yearInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" value="${ele.year}">
                                        <input id="genreInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" value="${ele.genre}">
                                        <input id="posterInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" value="${ele.poster}">
                                        <div class="input-group mb-2 mr-sm-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Rating</div>
                                            </div>
                                            <select id="ratingSelect${ele.id}" class="form-control">`
		if (ele.rating === '1') {
			modalHTML += `<option selected>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>`
		} else if (ele.rating === '2') {
			modalHTML += `<option>1</option>
                         <option selected>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>`
		} else if (ele.rating === '3') {
			modalHTML += `<option>1</option>
                          <option>2</option>
                          <option selected>3</option>
                          <option>4</option>
                          <option>5</option>`
		} else if (ele.rating === '4') {
			modalHTML += `<option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option selected>4</option>
                          <option>5</option>`
		} else if (ele.rating === '5') {
			modalHTML += `<option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option selected>5</option>`
		}
		modalHTML += `</select>
                           </div>
                           <textarea id="plotInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2">${ele.plot}</textarea>
                  <div class="modal-footer">
                       <button id="editMovie${ele.id}" class="btn btn-primary" data-dismiss="modal">Submit</button>
                       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div></div></div></div></div>`
	}
	movieModal.html(modalHTML)
}
/************Add movie button************/
	addBtn.click(() => {
	addBtn.attr('disabled');
	let userPoster = $('#posterInput').val()
	let userTitle = $('#titleInput').val()
	let userYear = $('#yearInput').val()
	let userGenre = $('#genreInput').val()
	let userRating = $('#ratingSelect').val()
	let userPlot = $('#plotInput').val()
	let userMovie = {
		poster: userPoster,
		title: userTitle,
		year: userYear,
		genre: userGenre,
		rating: userRating,
		plot: userPlot
	}
	const postOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userMovie)
	}
	fetch(url, postOptions)
		.then(res => res.json())
		.then(data => console.log(data))
		.then(getAllMovie(2000))
		.then(addBtn.removeAttr('disabled'))
		.catch(error => console.error(error))
})
	getAllMovie(2000);

// const API_URL = 'https://bird-showy-spur.glitch.me/movies';
let sortMoviesAtoZ = () => fetch(API_URL)
	.then(resp => resp.json())
	.catch(err => console.error(err));
	
sortMoviesAtoZ().then((data) => {
// console.log(data);
let completeMovieList = data.sort((a, b) => {
	// console.log(completeMovieList);
})
})
