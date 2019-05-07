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
// const server = app.listen(PORT, '127.0.0.1', 'localhost', () => console.log(`Listening on ${ PORT }`));


// ***************************************************
// HELPERS
// ***************************************************
const getChartsData = require('./helpers/GetRoutes/getChartsData.js');

// knex('inventoryCount')
//   .select('id', 'materialMaster', 'created_at', 'deleted_at')
//   .then(chartData => {
//   console.log({ chartData });
// });


// ***************************************************
// ROUTES - GET
// ***************************************************
// app.get('/', (req, res) => res.send('Hello Worldq!'));

app.get('/', (req, res) => {
  // knex('mtrlMovements')
  // .select('mtrlNum')
  // .groupBy('mtrlNum')
  // .orderBy('mtrlNum')
  // .then(res.send);
  res.send('yo');
});

app.get('/api/charts', (req, res) => {
  getChartsData(req, res, knex);
});


const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));