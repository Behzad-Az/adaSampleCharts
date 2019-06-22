const getChartData = (req, res, knex) => {

  const { mtrlNum } = req.query;

  let rawMtrlMoveData;

  const getMtrlMovements = () => knex('mtrlMovements')
    .innerJoin('mtrlMetaInfo', 'mtrlMovements.mtrlMetaInfoId', 'mtrlMetaInfo.id')
    .sum('qntyMoved as qntyMoved')
    .select(
      'postingDate', 'mtrlNum', 'reorderQnty', 'maxQnty',
      'chartLowerBound', 'currentQnty', 'header', 'movingPrice',
      'plannedDelivTime'
    )
    .where('mtrlNum', mtrlNum)
    .groupBy(
      'postingDate', 'mtrlNum', 'reorderQnty', 'maxQnty',
      'chartLowerBound', 'currentQnty', 'header', 'movingPrice',
      'plannedDelivTime'
    )
    .orderBy('postingDate', 'mtrlNum');

  const getMtrlComments = () => knex('mtrlComments')
    .innerJoin('mtrlMetaInfo', 'mtrlComments.mtrlMetaInfoId', 'mtrlMetaInfo.id')
    .select('postingDate', 'createdBy', 'content', 'acknowledgeable', 'acknowledged', 'mtrlComments.id')
    .where('mtrlNum', mtrlNum)
    .orderBy('postingDate');


  getMtrlMovements()
  .then(results => {
    rawMtrlMoveData = results;
    return getMtrlComments()
  })
  .then(rawMtrlComments => res.send({ rawMtrlMoveData, rawMtrlComments, mtrlNum }))
  .catch(err => {
    console.error('Error in getChartData.js: ', err);
    res.status(400);
  });

};

module.exports = getChartData;
