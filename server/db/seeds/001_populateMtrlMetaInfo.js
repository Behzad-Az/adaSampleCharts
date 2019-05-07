const fs = require('fs');
const dataRaw = fs.readFileSync(__dirname + '/_mtrlMetaInfoSeed.json');
const dataArr = JSON.parse(dataRaw);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mtrlMetaInfo')
  .del()
  .then(() => Promise.all([ knex('mtrlMetaInfo').insert(dataArr) ]))
};
