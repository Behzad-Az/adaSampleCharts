const getChartsData = (req, res, knex) => {

  const materialNums = [ '66108593', '11093090' ];

  knex('inventoryCount')
  .sum('qntyOfOrder as qntyMoved')
  .select('postingDate as date', 'materialNum')
  .whereIn('materialNum', materialNums)
  .groupBy('date', 'materialNum')
  .orderBy('date', 'materialNum')
  .then(allInventoryMoveData => res.send({ allInventoryMoveData, materialNums }))
  .catch(err => {
    console.log('Error in getChartsData.js: ', err);
    res.send(false);
  });

};

module.exports = getChartsData;
