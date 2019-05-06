const getChartsData = (req, res, knex) => {

  knex('inventoryCount')
  .select('id', 'materialNum', 'postingDate')
  .then(chartData => res.send({ chartData }))
  .catch(err => {
    console.log('Error in getChartsData.js: ', err);
    res.send(false);
  });

};

module.exports = getChartsData;
