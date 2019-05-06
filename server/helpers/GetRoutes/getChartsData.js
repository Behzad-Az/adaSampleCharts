const getChartsData = (req, res, knex) => {

  console.log("i'm here 0, getChartsData.js");

  knex('inventoryCount')
  .sum('qntyOfOrder as qntyMoved')
  .select('postingDate as date', 'materialNum')
  .groupBy('date', 'materialNum')
  .orderBy('date', 'materialNum')
  .then(results => res.send({ results }))
  .catch(err => {
    console.log('Error in getChartsData.js: ', err);
    res.send(false);
  });

};

module.exports = getChartsData;
