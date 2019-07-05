const getChartData = (req, res, knex) => {

  knex('mtrlMetaInfo')
  .select('mtrlNum', 'header')
  // .whereIn('mtrlNum', [11096900, 11931348, 11622628, 11828311, 2644258, 2985112, 67006468, 11999147, 2452370, 11607825, 12069315, 11622628, 67108726])
  .whereIn('mtrlNum', [11931348, 11622628, 2644258, 67006468, 2452370, 11607825, 12069315, 67108726])
  .limit(8)
  .then(mtrlList => res.send({ mtrlList }))
  .catch(err => {
    console.log('Error in getMtrlList.js: ', err);
    res.status(400);
  });

};

module.exports = getChartData;
