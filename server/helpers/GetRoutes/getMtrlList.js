const getChartData = (req, res, knex) => {

  const { mtrlNum } = req.query;

  knex('mtrlMetaInfo')
  .select('mtrlNum')
  .limit(10)
  .then(mtrlList => res.send({ mtrlList }))
  .catch(err => {
    console.log('Error in getMtrlList.js: ', err);
    res.status(400);
  });

};

module.exports = getChartData;
