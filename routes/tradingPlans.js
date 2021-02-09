const config = require('config');
const db = require('../db/db.js');

const tradingPlansRoutes = app => {
  // READ
  app.get('/tradingPlans', (req, res) => {
    (async function () {
      let dbConnection = await db.connection(config.DB);
      let tradingPlans = await db.getLastMonthTradingPlans(dbConnection);

      res.send(tradingPlans);
    })();
  });
};

module.exports = tradingPlansRoutes;
