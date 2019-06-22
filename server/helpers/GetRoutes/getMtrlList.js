const getChartData = (req, res, knex) => {

  knex('mtrlMetaInfo')
  .select('mtrlNum', 'header')
  .whereIn('mtrlNum', [11037462, 11043884, 11091186, 11093090, 2032491, 2057777, 66091741])
  .limit(8)
  .then(mtrlList => res.send({ mtrlList }))
  .catch(err => {
    console.log('Error in getMtrlList.js: ', err);
    res.status(400);
  });

};

module.exports = getChartData;
