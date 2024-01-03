const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("hello express 5"))

app.listen(port, () => console.log(`Application started on : http://localhost:${port} `))