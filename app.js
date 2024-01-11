const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const sequelize = require ('./src/db/sequelize');

const app = express();
const port = 4000;

app
  .use(morgan('dev'))
  .use(bodyParser.json())

sequelize.initDb();

    


app.listen(port, () => console.log(`Application started on : http://localhost:${port} `))