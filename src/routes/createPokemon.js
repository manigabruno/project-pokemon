const { Pokemon } = require('../db/sequelize')
const { ValidationError} = require('sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({message: error.message, data: error})
        }
        const message = "la liste des pokemons n'a pas pu etre récupérée. Réesayer dans un instant"
        res.status(500).json({message, data: error})
      })
  })
}