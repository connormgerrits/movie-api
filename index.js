const express = require('express')
const bodyParser = require('body-parser')
const { getAllMovies, getMovieByTitleOrDirector, saveNewMovie } = require('./controllers/movies')

const app = express()

// GET request for all data
app.get('/movies', getAllMovies)

// GET request for a movie by title
app.get('/movies/:search', getMovieByTitleOrDirector)

// POST a new movie
app.post('/movies', bodyParser.json(), saveNewMovie)

app.all('*', (request, response) => {
    return response.sendStatus(404)
})

app.listen(1337, () => {
    console.log("Listening on port 1337...")
})