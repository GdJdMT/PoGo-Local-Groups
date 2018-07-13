const manage = require('../controllers/manage');
const auth = require('../controllers/auth');
module.exports = (app) => {
  app.get('/admin', auth.ensureAuthenticated, (req, res) => res.render('manage'));

  app.route('/admin/addgym')
    .get(auth.ensureAuthenticated, (req, res) => res.render('addGym'))
    .post(auth.ensureAuthenticated, manage.addGym);

  app.route('/admin/delete/:id')
    .get(auth.ensureAuthenticated,manage.getDel)
    .post(auth.ensureAuthenticated, manage.delUser);

  app.get('/admin/:city', auth.ensureAuthenticated, manage.getUsers);
}
