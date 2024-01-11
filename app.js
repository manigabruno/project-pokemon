const express = require('express');
let pokemons = require('./mock-pokemon.js');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require ('sequelize');
const {success, getUniqueId}  = require('./Helper.js');
const morgan = require ('morgan');
const pokemonModel = require('./src/models/pokemon')

const app = express();
const port = 4000;

const sequelize = new Sequelize(
'pokedex',
'root',
'',
{
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    }, 
    logging: false
  }
)
sequelize.authenticate()
.then(_ => console.log('la connexion a la base de donnée a bien été etablie'))
.catch(error => console.error(`Impossible de se connecter a la base donnée ${error}`))

const Pokemon = pokemonModel(sequelize, DataTypes)
sequelize.sync({force: true})
.then(_ => {
  console.log('la base de donnée "pokedex a bien été synchronisée')

   pokemons.map(pokemon => { 
     Pokemon.create({
     name: pokemon.name,
     hp: pokemon.hp,
     cp: pokemon.cp,
     picture: pokemon.picture,
     types: pokemon.types.join()
     }).then(bulbizzare => console.log(bulbizzare.toJSON()))
   })
})

app
  .use(morgan('dev'))
  .use(bodyParser.json())


app.get('/', (req, res) => res.send("hello express 5"))

app.get('/api/pokemons/:id/', (req, res) =>{
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokemon a bien ete trouvé'
  res.json(success(message, pokemon))
});

//  creation de la liste des pokemons
app.get('/api/pokemons', (req, res) =>{
    const message = 'la liste des pokemon a bien été récupéré'
    res.json(success(message, pokemons));
    });

    // creation d'un pokemon
app.post('/api/pokemons', (req, res) => {
     const id = getUniqueId(pokemons);
     const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
     pokemons.push(pokemonCreated);
     const message = `le pokemon ${pokemonCreated.name} à bien été créé.`
     res.json(success(message, pokemonCreated))
    });

    // modification d'un pokemon
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id}
    pokemons = pokemons.map(pokemon => {  
    return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `le pokemon ${pokemonUpdated.name} à bien été modifié`
    res.json(success(message, pokemonUpdated))
    })
    // suppression d'un pokemon
 app.delete('/api/pokemons/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `le pokemon ${pokemonDeleted.name} à bien été supprimé`
    res.json(success(message, pokemonDeleted))
    })

    


app.listen(port, () => console.log(`Application started on : http://localhost:${port} `))