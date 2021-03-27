const movies = require('../movies')

let getAllMovies = (request, response) => {
    return response.send(movies)
}

let getMovieByTitleOrDirector = (request, response) => {
    const { search } = request.params

    const movieList = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(search.toLowerCase()) || 
            movie.directors.find((director) => director.toLowerCase().includes(search.toLowerCase())) // using the 'find()' method for directors works here because the value of the element it successfully returns will be considered 'true' by the filter function's return statement, since the returned element is, in fact, there/existing/present. Otherwise, 'find()' returns undefined, which the filter's return statement reads as 'false'
            // directorSearch(movie, search)
        })

    return response.send(movieList)
}

// function directorSearch(movie, search) {
//     for (let i = 0; i < movie.directors.length; i++) {
//         if (movie.directors[i].toLowerCase().includes(search.toLowerCase())) {
//             return true
//         }
//     }
//     return false
// }

let saveNewMovie = (request, response) => {
    const { title, directors, releaseDate, rating, runTime, genres } = request.body

    if ( !title || !directors || !releaseDate || !rating || !runTime || !genres) {
        return response.status(400).send("One or more of the datafield elements are missing from your data.")
    }

    const newMovie = { title, directors, releaseDate, rating, runTime, genres }
    movies.push(newMovie)
    
    return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, getMovieByTitleOrDirector, saveNewMovie }