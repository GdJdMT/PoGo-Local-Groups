const conts = require('../controllers/conts');

module.exports = (app) => {
  app.get('/api/list', (req, res) => {
    const city = req.query.loc || 'test';
    conts.findList(city, (err,data) => {if (err) {throw err;} else {res.json(data);}});
  });

  app.get('/api/last', (req, res) => {
    const city = req.query.loc || 'test';
    const limit = +req.query.limit || 20;
      conts.findLast(city, limit, (err,data) => {if (err) {throw err;} else {res.json(data)}});
  });

  app.get('/api/gyms', (req, res) => {
    const city = req.query.loc || 'test';
    conts.findGyms(city,(err,data) => {if (err) {throw err;} else {res.json(data)}});
  });
}