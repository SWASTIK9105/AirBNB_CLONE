const User=require('../models/user.js');
module.exports.GetsignUp=(req,res)=>{
    res.render('listings/signup.ejs');
};
module.exports.signUp=async(req,res)=>{
    try{
let {email,username,password}=req.body;
const newUser=new User({email,username});
const registeredUser =await User.register(newUser,password);
req.login(registeredUser,(err)=>{
    if(err){
     return next(err);}
req.flash("success",'User Registered Successfully !')
res.redirect('/listings');});} catch(e){
    req.flash('error',e.message);
    res.redirect('/signup');
}
};
module.exports.Getlogin=(req,res)=>{
    res.render('listings/login.ejs');
};
module.exports.logIn= async(req,res)=>{
    req.flash("success","Congratulations!  You Logged In Successfully");
    let redirectUrl=res.locals.redirectUrl || '/listings';
      res.redirect(redirectUrl);
  };
  module.exports.logOut=(req,res,next)=>{
    req.logOut((err)=>{
if(err){
 return next(err);
}
req.flash("success","You Logged Out Successfully !");
res.redirect('/listings')
    });
};