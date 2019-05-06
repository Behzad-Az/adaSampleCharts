const fs = require('fs');


const dataRaw = fs.readFileSync(__dirname + '/_materialMovementSeed.json');
// console.log(JSON.parse(dataRaw));
const dataArr = JSON.parse(dataRaw);


// exports.seed = function(knex, promise) {
//   dataArr.forEach(entry => {

//   })
// exports.seed = (knex, promise) => Promise.all([ knex('inventoryCount').insert(dataArr) ]);
// }


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('inventoryCount')
  .del()
  .then(() => Promise.all([ knex('inventoryCount').insert(dataArr) ]))
    // .then(function () {
    //   // Inserts seed entries
    //   return knex('table_name').insert([
    //     {id: 1, colName: 'rowValue1'},
    //     {id: 2, colName: 'rowValue2'},
    //     {id: 3, colName: 'rowValue3'}
    //   ]);
    // });
};
