const getChartsData = (req, res, knex) => {

  const mtrlNums = [ '66108593', '11093090' ];

  knex('inventoryCount')
  .sum('qntyOfOrder as qntyMoved')
  .select('postingDate as date', 'mtrlNum')
  .whereIn('mtrlNum', mtrlNums)
  .groupBy('date', 'mtrlNum')
  .orderBy('date', 'mtrlNum')
  .then(rawMtrlMoveData => res.send({ rawMtrlMoveData, mtrlNums }))
  .catch(err => {
    console.log('Error in getChartsData.js: ', err);
    res.send(false);
  });

};

module.exports = getChartsData;
