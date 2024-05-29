const express = require('express')
const { authMiddleware } = require('../middleware/auth')
const { addMovie, getMovies, getMovieById, deleteMovieById, getRandomMovie, getTopRateMovie, createMovieReview, updateMovie } = require('../controller/movie.controller')
const router = express.Router()

router.get('/',getMovies)
router.get('/random',getRandomMovie)
router.get('/toprate',getTopRateMovie)
router.post('/',addMovie)
router.post('/review/:id',authMiddleware,createMovieReview)
router.get('/:id',getMovieById)
router.delete('/:id',deleteMovieById)
router.put('/:id',updateMovie)
module.exports = router