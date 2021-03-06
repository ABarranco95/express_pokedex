var express = require('express');
var router = express.Router();
const axios = require('axios')
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(allPokemon => {
    res.render('pokemon/index', {allPokemon})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(() => {
    res.redirect('/pokemon')
  })

});

router.get('/:id', (req, res) => {
  let pokemonSearch = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch}/`)
  .then((response) => {
    res.render('/pokemon/show', { poke: response.data })
  })
})


module.exports = router;