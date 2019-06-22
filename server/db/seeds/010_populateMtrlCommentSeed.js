const fs = require('fs');
const dataRaw = fs.readFileSync(__dirname + '/_mtrlCommentSeed.json');
const dataArr = JSON.parse(dataRaw);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mtrlComments')
  .then(() => Promise.all([ knex('mtrlComments').insert(dataArr) ]))
};
