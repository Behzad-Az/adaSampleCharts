const getChartData = (req, res, knex) => {

  knex('mtrlMetaInfo')
  .select('mtrlNum', 'header')
  .where('mtrlNum', 11093090)
  .limit(7)
  .then(mtrlList => res.send({ mtrlList }))
  .catch(err => {
    console.log('Error in getMtrlList.js: ', err);
    res.status(400);
  });

};

module.exports = getChartData;
