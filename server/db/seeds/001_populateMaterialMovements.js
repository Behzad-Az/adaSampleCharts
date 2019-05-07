const fs = require('fs');
const dataRaw = fs.readFileSync(__dirname + '/_materialMovementSeed.json');
const dataArr = JSON.parse(dataRaw);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('inventoryCount')
  .del()
  .then(() => Promise.all([ knex('inventoryCount').insert(dataArr) ]))
};
