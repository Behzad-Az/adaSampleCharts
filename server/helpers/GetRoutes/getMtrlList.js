const getChartData = (req, res, knex) => {

  knex('mtrlMetaInfo')
  .select('mtrlNum', 'header')
  .whereIn('mtrlNum', [11096900, 11931348, 11622628, 11828311, 2644258, 2985112, 67006468])
  .limit(8)
  .then(mtrlList => res.send({ mtrlList }))
  .catch(err => {
    console.log('Error in getMtrlList.js: ', err);
    res.status(400);
  });

};

module.exports = getChartData;
