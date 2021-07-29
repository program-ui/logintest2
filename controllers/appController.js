const bcrypt = require('bcryptjs')
const User = require('../models/User')
const passport = require('passport')

exports.landing_page = (req, res) => {
   res.render('landing')
}

exports.register_get = (req, res) => {
res.render('register')
}

exports.register_post = async (req, res) => {
  const{username, email, password, password2} = req.body
  let errors = []
  if(!username || !email || !password || !password2) {
    errors.push({msg: 'Please Fill In All Fields'})
  }
  if(password !== password2){
    errors.push({msg: 'Passwords Do Not Match'})
  }

   let user = await User.findOne({email})
   if(user) {
    errors.push({msg: 'Email Is Already Registered'})
   }
   if (errors.length > 0) {
     res.render('register', {
       errors,
       username,
       email,
       password,
       password2
     })
   }
   else {
   const hashPsw = await bcrypt.hash(password, 12)
 
    let newUser = new User({
    username,
    email,
    password: hashPsw,
  })
  
  await newUser.save()
  req.flash('success_msg', 'Registration is Successful')
  res.redirect('/users/login')
}
}

exports.login_get = (req, res) => {
res.render('login')
}

exports.login_post = (req,res,next) => {
 passport.authenticate('local', {
   successRedirect: '/dashboard',
   failureRedirect: '/users/login',
   failureFlash: true
   //flash located in req.flash('error')
 })(req,res,next)
}

exports.dashboard_get = (req,res) => {
  
  res.render("dashboard", {name: req.user.username})
  console.log(req.user);
}

exports.logout_get = (req,res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/users/login')
 
}