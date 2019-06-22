const getChartsData = (req, res, knex) => {

  // const mtrlNums = [ '66108593' ];
  // const mtrlNums = [ '66108593', '11828311' ];
  const mtrlNums = [2452370, 2269606, 2136238, 2644258, 2985112, 2262176, 11096900, 10955526, 11999147, 11947752, 11931348, 11747807, 11607825, 11084180, 11506455, 11795251, 12069315, 11622628, 11248043, 11224513, 11457528, 11164335, 11828311, 67006468, 66681641, 66803037, 66855137, 67108726, 66533581, 66067564, 66569492];

  knex('mtrlMovements')
  .innerJoin('mtrlMetaInfo', 'mtrlMovements.mtrlMetaInfoId', 'mtrlMetaInfo.id')
  .sum('qntyMoved as qntyMoved')
  .select(
    'postingDate', 'mtrlNum', 'reorderQnty', 'maxQnty',
    'chartLowerBound', 'currentQnty', 'header', 'movingPrice',
    'plannedDelivTime'
  )
  .whereIn('mtrlNum', mtrlNums)
  .groupBy(
    'postingDate', 'mtrlNum', 'reorderQnty', 'maxQnty',
    'chartLowerBound', 'currentQnty', 'header', 'movingPrice',
    'plannedDelivTime'
  )
  .orderBy('postingDate', 'mtrlNum')
  .then(rawMtrlMoveData => res.send({ rawMtrlMoveData, mtrlNums }))
  .catch(err => {
    console.log('Error in getChartsData.js: ', err);
    res.send(false);
  });

};

module.exports = getChartsData;
