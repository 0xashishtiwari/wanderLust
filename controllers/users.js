const User = require('../models/user');

module.exports.renderSignUpForm = (req ,res)=>{
    res.render('users/signup.ejs');
}

module.exports.signup = async(req , res)=>{
    try {
     let {username , email ,password} = req.body;
    // console.log(username , email , password);
    let newUser =  new User({email , username});
  const registeredUser =   await User.register(newUser , password);
  console.log(registeredUser);
  req.logIn(registeredUser ,(err)=>{
        if(err){
           return next(err);
        }
      req.flash("success" , "Welcome to WanderLust!");
         res.redirect('/listings');
  })

    } catch (error) {
        req.flash("error" ,error.message);
        res.redirect('/signup');
    }
}

module.exports.rederloginForm = (req ,res)=>{
    res.render('users/login.ejs');
}

module.exports.login = async(req , res)=>{
   req.flash('success' , "Welcome to WanderLust! You are logged in!");
   let redirectUrl = res.locals.redirectUrl || "/listings";
   res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "You are logged out!")
        res.redirect('/listings');
    })
}