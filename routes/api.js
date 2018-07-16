const conts = require('../controllers/conts');
const DEFCITY = process.env.DEFCITY;
module.exports = (app) => {
  app.get('/api/list', (req, res) => {
    const city = req.query.loc || DEFCITY;
    conts.findList(city, (err,data) => {if (err) {throw err;} else {res.json(data);}});
  });

  app.get('/api/last', (req, res) => {
    const city = req.query.loc || DEFCITY;
    const limit = +req.query.limit || 20;
      conts.findLast(city, limit, (err,data) => {if (err) {throw err;} else {res.json(data)}});
  });
  
  app.get('/api/search', (req,res) => {
    const city = req.query.loc || DEFCITY;
    const q = req.query.q;
    conts.findUser(city, q, (err,data) => {if (err) {throw err;} else {res.json(data)}});
  });
  
  app.get('/api/gyms', (req, res) => {
    const city = req.query.loc || DEFCITY;
    conts.findGyms(city,(err,data) => {if (err) {throw err;} else {res.json(data)}});
  });
}