const getChartData = (req, res, knex) => {

  const { mtrlNum } = req.query;

  knex('mtrlMetaInfo')
  .select('mtrlNum')
  .then(mtrlList => res.send({ mtrlList }))
  .catch(err => {
    console.log('Error in getMtrlList.js: ', err);
    res.status(400);
  });

  // knex('mtrlMovements')
  // .innerJoin('mtrlMetaInfo', 'mtrlMovements.mtrlMetaInfoId', 'mtrlMetaInfo.id')
  // .sum('qntyMoved as qntyMoved')
  // .select(
  //   'postingDate', 'mtrlNum', 'reorderQnty', 'maxQnty',
  //   'chartLowerBound', 'currentQnty', 'header', 'movingPrice',
  //   'plannedDelivTime'
  // )
  // .where('mtrlNum', mtrlNum)
  // .groupBy(
  //   'postingDate', 'mtrlNum', 'reorderQnty', 'maxQnty',
  //   'chartLowerBound', 'currentQnty', 'header', 'movingPrice',
  //   'plannedDelivTime'
  // )
  // .orderBy('postingDate', 'mtrlNum')
  // .then(rawMtrlMoveData => res.send({ rawMtrlMoveData, mtrlNum }))
  // .catch(err => {
  //   console.log('Error in getChartData.js: ', err);
  //   res.status(400);
  // });

};

module.exports = getChartData;
