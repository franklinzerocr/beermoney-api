const config = require('config');
const db = require('../db/db.js');
const cors = require('cors');

const tradingPlansRoutes = app => {
  app.use(cors());

  // READ
  app.get('/tradingPlans', (req, res) => {
    (async function () {
      let dbConnection = await db.connection(config.DB);
      let tradingPlans = await db.getLastMonthTradingPlans(dbConnection);
      // tradingPlans = JSON.stringify(Object.assign({}, tradingPlans));
      // tradingPlans = JSON.parse(tradingPlans);

      res.send(tradingPlans);
    })();
  });
};

module.exports = tradingPlansRoutes;
