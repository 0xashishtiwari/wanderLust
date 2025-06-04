module.exports.isLoggedIn = (req, res , next)=>{
    // console.log(req.path ,"  " , req.originalUrl);
    if(!req.isAuthenticated()){
        //agar user logged in nahi h to OriginalUrl pe jayenge login ke baad
        req.session.redirectUrl = req.originalUrl;
         req.flash('error', " You must be loggedIn!");
        return res.redirect('/login');
    }else{
        next();
    }
}


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}