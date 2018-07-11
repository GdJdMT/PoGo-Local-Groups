const manage = require('../controllers/manage');
const auth = require('../controllers/auth');
module.exports = (app) => {

  app.route('/admin/addgym')
    .get(auth.ensureAuthenticated, (req, res) => res.render('addGym'))
    .post(auth.ensureAuthenticated, manage.addGym);

}
