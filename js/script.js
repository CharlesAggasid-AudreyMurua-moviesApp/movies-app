"use strict"

const API_URL = 'https://bird-showy-spur.glitch.me/movies';


//loading
setTimeout(function() {
	document.querySelector('.loading').style.display='none'

//function to call all movie data
	let getAllMovies = () => {
		fetch(API_URL).then(resp => resp.json()).then(data => {
			let movieArr = data.map(movies => movies)
			let html = ''
			for (let element of movieArr) {
				//cards
				html += `<div class="col-12 col-md-4 col-lg-3 movie-columns">`
				html += ` <div class="card" style="width: 18rem;">`
				html += `<img id="movie-poster${element.id}" src="${element.poster}" class="card-img-top" alt="Movie Poster" style="height: 100%; width: auto">`
				html += `<div class="info info${element.id} hidden">`
				html += `<div class="card-body">`
				html += `<h5 class="card-title">${element.title}</h5>`
				html += `<p class="card-text">${element.plot}</p>`
				html += `<p class="card-text">Rating: ${element.rating}</p>`
				html += `<p class="card-text">Genres: ${element.genre}</p>`
				html += `<button class="btn-block btn edit-data${element.id}" data-toggle="modal" data-target="#editModal${element.id}">Edit</button>`
				html += `<div id="delete${element.id}"><i class="far fa-times-circle"></i></div>`
				html += `</div></div></div></div>`

				$('.main-row').html(html);

				//for loop to toggle between movie poster and movie info
				for (let element of data) {
					//toggles poster to off when clicked
					$(`#movie-poster${element.id}`).click(function () {
						$(`.info${element.id}`).show();
						$(`#movie-poster${element.id}`).hide();
					})
					//toggles info to off when clicked
					$(`.info${element.id}`).click(function () {
						$(`.info${element.id}`).hide();
						$(`#movie-poster${element.id}`).show();
					})
				}

				//html for loop
			}

			//loop for deleting movie
			for (let element of data) {
				$(`#delete${element.id}`).click(function () {
					let options = {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					}
					return fetch(`${API_URL}/${element.id}`, options).then(resp => resp.json()).then(getAllMovies).catch(error => console.error(error))
				})
			}

			//Loop for editing movie

			// for(let element of data) {
			$(`.edit-data${element.id}`).click(function () {
				// e.preventDefault();
				// $(".edit-modal-container").show();
				let editMovie = {
					'title': $('#editTitle').val(),
					'genre': $('#editGenre').val(),
					'poster': $("#editPoster").val(),
					// 'rating': $("#editRating").val(),
					'plot': $('#editPlot').val(),
				};
				const options = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(editMovie)
				}

				fetch(`${API_URL}/${element.id}`, options)
					.then(res => res.json())
					.catch(error => console.error(error))
			})
			// }

			//fetch api for get movies
		})

//let get all movies
	}



	getAllMovies()
}, 5000);


//Add Movie
$('#addMovie').click((e) => {
	e.preventDefault();
	let newUserMovie = {
		'title': $('#titleInput').val(),
		'genre': $('#genreInput').val(),
		'poster': $("#posterInput").val(),
		'rating': $("#ratingInput").val(),
		'plot': $('#plotInput').val(),
	};
	const post = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUserMovie),
	};
	return fetch(`${API_URL}`, post)
		.then(resp => resp.json())
		.then(getAllMovies)
		.catch(error => console.error(error))
});