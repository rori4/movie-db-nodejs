const fs = require('fs')
const { getResponse } = require('./responseHandler')
const qs = require('querystring')

const movieHandler = (req, res) => {
	if(req.path === '/viewAllMovies' && req.method === 'GET'){
		fs.readFile('./views/viewAll.html', (err, data) => {
			if(err) {
				console.log(err)
				return
			}
			fs.readFile('./config/dataBase.json', (err, db) => {
				if(err) {
					console.log(err)
					return
				}
				let allMovieHTML = ''
				db = JSON.parse(db)
				for (const movie of db.movies) {
					let movieHTML = `<div class="movie">`
					movieHTML += `<a href="/movies/details/${movie.id}">`
					movieHTML += `<img class="moviePoster" src="${movie.moviePoster}" />`
					movieHTML += `</a>`
					movieHTML += `</div>`
					allMovieHTML += movieHTML
				}
				let responseHTML = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', allMovieHTML)
				res.writeHead(200, {
					'Content-Type': 'text/html',
				})
				res.write(responseHTML)
				res.end()
			})
		})
		return true
	}
	
	if(req.path === '/addMovie'){
		if(req.method === "GET"){
			getResponse('./views/addMovie.html', res)
			return true	
		} else if (req.method === 'POST') {
			let body = ''
			req.on('data', chunks => {
				body += chunks
			})
			req.on('end', () => {
				const movie = qs.parse(body)
				console.log(movie)
				fs.readFile('./config/dataBase.json', (err, data) => {
					if(err) {
						console.log(err)
						return
					}
					const json = JSON.parse(data)
					movie.id = json.movies.length + 1
					json.movies.push(movie)
					fs.writeFile('./config/dataBase.json', JSON.stringify(json), ()=> {
						console.log(`Movie ${movie.movieTitle} has been added to database!`)
					})
				})
				res.writeHead(302, {
					Location: '/viewAllMovies'
				})
				res.end()
			})
			return true
		}
	}
}

module.exports = { movieHandler }