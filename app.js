const express = require('express');
const {success, getUniqueId}  = require('./Helper.js');
let pokemons = require('./mock-pokemon.js');
const bodyParser = require('body-parser')
const morgan = require ('morgan');

const app = express();
const port = 3000;

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
     const message = `le pokemon ${pokemonCreated.name} à bien été crée.`
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

    


app.listen(port, () => console.log(`Application started on : http://localhost:${port} `))