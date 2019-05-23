const getChartsData = (req, res, knex) => {

  // const mtrlNums = [ '66108593' ];
  // const mtrlNums = [ '66108593', '11093090' ];
  const mtrlNums = ['11037462', '11040048', '11041739', '11042597', '11043884', '11043894', '11043895', '11044377', '11073845', '11078731', '11084700', '11091186', '11091187', '11092270', '11092279', '11092290', '11093090', '2005541', '2020887', '2023754', '2032491', '2057777', '2063224', '66091741', '66106264', '66106543', '66108593', '66112974', '66114879', '66144675', '66215054'];

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
