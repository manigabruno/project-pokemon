const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null) {
        const message = "le pokemon demandé n'existe pas. réessayez avec un autre identifinat"
          return res.status(404).json({message})
      }
      
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(error => {
      const message = "la liste des pokemons n'a pas pu etre supprimé. Réesayer dans un instant"
      res.status(500).json({message, data: error})
    })
  })
}