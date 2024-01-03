const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("hello express 5"))

app.get('/api/pokemons/:id/:name/:color', (req, res) =>{
const id = req.params.id
const name = req.params.name
const color = req.params.color
res.send(`vous avez demandé le pokemon ${id} dont le nom est ${name} qui est de couleur ${color}`)
} )

app.listen(port, () => console.log(`Application started on : http://localhost:${port} `))