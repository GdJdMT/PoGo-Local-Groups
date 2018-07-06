const mongoose = require('mongoose');
const User = require('../models/trainer.js');

exports.register = (req, res) => {
  User.findOne({displayName:req.body.nick}, (err,u) => {
    if (err) {throw err; } else {
      if (u) {
        if (!u.password) {
          u.setPassword(req.body.password, (err,u) => {
            if (err) {throw err; } else {
              u.password = true;
              u.save((err) => { 
                if (err) {throw err; } else {
                  req.flash('success', 'Sweet! Now you can login!');
                  res.redirect('/login')}
              });
            }
          })
        }
      } else {
        res.send('not-yet');
      }
    }
  })
    /*User.register(new User({
        username: req.body.username,
        firstname: req.body.firstname
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            res.send({
                success: true,
                user: user
            });
        }
    });*/
};

exports.login = (req, res, next) => {
  User.authenticate()(req.body.nick, req.body.password, (err, user, options) => {
    if (err) return next(err);
    if (user === false) {
      req.flash('error','No such user and/or wrong password');
      res.redirect('/login');
    } else {
      req.login(user, (err) => {
        res.redirect('/profile');
      });
    }
  });
};

exports.change = (req, res) => {
  req.user.changePassword(req.body.oldPassword, req.body.newPassword, (err, user) => {
    if (err) {throw err} else {
      req.flash('success', 'Password changed');
      res.redirect('/profile');
    };
  });
};

exports.getLogin = (req, res) => {
  if (req.user) {
     return res.redirect('/profile');
  }
  res.render('login', {
    title : 'Login'
  });
};

exports.getRegister = (req, res) => {
  if (req.user) {
     return res.redirect('/profile');
  }
  res.render('register', {
    title : 'Register'
  });
};

exports.getChange = (req, res) => {
  res.render('change-password', {
    title:'Change password'
  });
};

exports.getUser = (req, res) => {
  const name = req.params.name;
  User.findOne({name:name.toLowerCase()},(err,user) => {
    if (err) {throw err; } else {
      if (user) {
        res.render('profile', {user:user, title:`${user.displayName}'s profile`});
      } else {
        req.flash('error','User not found');
        res.redirect('/');
      }
    }
  });
}

exports.editUser = (req,res) => {
  const displayName = req.body.nick ? req.body.nick : req.user.displayName;
  const name = displayName.toLowerCase();
  const level = req.body.level ? req.body.level : req.user.level;
  const code = req.body.code ? req.body.code : req.user.code;
  const update = {displayName: displayName, name:name, level: level, code:code};
  User.findOneAndUpdate({_id:req.user._id}, update, {new: true}, (err, user) => {
    if (err) {throw err; } else {
      req.flash('success', 'Profile updated!');
      res.redirect('/profile');
    }
  });
}
