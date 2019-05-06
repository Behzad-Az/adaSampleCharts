const getChartsData = (req, res, knex) => {

  knex('inventoryCount')
  .sum('qntyOfOrder as qntyMoved')
  .select('postingDate as date', 'materialNum')
  .groupBy('date', 'materialNum')
  .orderBy('date', 'materialNum')
  .then(chartData => res.send({ chartData }))
  .catch(err => {
    console.log('Error in getChartsData.js: ', err);
    res.send(false);
  });

};

module.exports = getChartsData;
