const mysql = require('promise-mysql');

let db_config = {};

// Connect to the DB and get the Pool of it to perform querys
function connection(database) {
  db_config = {
    host: database.Host,
    user: database.User,
    password: database.Password,
    database: database.DatabaseName,
    connectionLimit: 100,
  };

  return mysql.createPool(db_config);
}

async function getLastMonthTradingPlans(dbConnection) {
  try {
    // DELAY DE 60 MINUTOS
    let timeConditionEnd = '(UNIX_TIMESTAMP(CURRENT_TIME())-UNIX_TIMESTAMP(tp.End))/3600 <720 AND (UNIX_TIMESTAMP(CURRENT_TIME())-UNIX_TIMESTAMP(tp.End))/3600 >=0.5';
    let floorCondition = 'f.FK_Trading_Plan = tp.ID AND f.Level=-2';

    let result = await dbConnection.query('SELECT tp.ID ID ,tp.Asset Asset,tp.Init Init,tp.End End, f.Profit Profit, f.TweetID TweetID FROM trading_plan tp, floor f WHERE tp.OutputAmount>0 AND tp.End IS NOT NULL AND tp.StopCondition IS NOT NULL AND tp.StopCondition NOT LIKE "%ERROR%" AND tp.StopCondition NOT LIKE "%NOT%" AND ' + timeConditionEnd + ' AND ' + floorCondition + ' ORDER BY tp.End DESC');
    return result;
  } catch (e) {
    console.log(e);
    console.log('getLastMonthTradingPlans Error');
    return false;
  }
}

module.exports = {
  connection,
  getLastMonthTradingPlans,
};
