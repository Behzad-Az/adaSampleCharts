'use strict';

// ***************************************************
// DEPENDENCIES
// ***************************************************
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./db/knexfile.js').development;
const knex = require('knex')(connection);


// ***************************************************
// MIDDLEWARE
// ***************************************************
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ***************************************************
// PORT
// ***************************************************
const PORT = process.env.PORT || 3000;


// ***************************************************
// HELPERS
// ***************************************************
const getChartData = require('./helpers/GetRoutes/getChartData.js');
const getChartsData = require('./helpers/GetRoutes/getChartsData.js');


// ***************************************************
// ROUTES - GET
// ***************************************************
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/chart', (req, res) => {
  getChartData(req, res, knex);
});

app.get('/api/charts', (req, res) => {
  getChartsData(req, res, knex);
});

// ***************************************************
// INITIATE SERVER
// ***************************************************
const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
