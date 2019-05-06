const getChartsData = (req, res, knex) => {

  knex('inventoryCount')
  .select('id', 'materialMaster', 'created_at', 'deleted_at')
  .then(chartData => {
    console.log({ chartData });
    res.send({ chartData });
  })
  .catch(err => {
    console.log('Error in getChartsData.js: ', err);
    res.send(false);
  });

};

module.exports = getChartsData;
