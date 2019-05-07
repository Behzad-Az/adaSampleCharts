const fs = require('fs');
const dataRaw = fs.readFileSync(__dirname + '/_mtrlMovementSeed02.json');
const dataArr = JSON.parse(dataRaw);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mtrlMovements')
  .del()
  .then(() => Promise.all([ knex('mtrlMovements').insert(dataArr) ]))
};
