const userConts = require('../controllers/user');
const auth = require('../controllers/auth');
module.exports = (app) => {
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.route('/login')
    .get(userConts.getLogin)
    .post(userConts.login);

  app.route('/register')
    .get(userConts.getRegister)
    .post(userConts.register);
  
  app.route('/change-password')
    .get(auth.ensureAuthenticated, userConts.getChange)
    .post(auth.ensureAuthenticated, userConts.change);

  app.route('/profile/edit')
    .get(auth.ensureAuthenticated, (req, res) => res.render('editProfile', {user : req.user, title:"Edit your profile", edit: true}))
    .post(auth.ensureAuthenticated, userConts.editUser);

  app.get('/profile', auth.ensureAuthenticated, (req, res) => res.render('profile', {user:req.user, title: 'Your profile', edit:true}));
  
  app.get('/profile/:name', userConts.getUser);
}
