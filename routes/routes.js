const tradingRoutes = require('./tradingPlans');

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('Welcome to Beermoney API 🍺');
  });

  // run our user route module here to complete the wire up
  tradingRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;
