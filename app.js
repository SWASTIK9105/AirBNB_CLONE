if(process.env.NODE_ENV !='production'){require('dotenv').config();}
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const ExpressError=require('./utility/ExpressError.js');
const reviewRouter=require('./routes/review.js');
const listingRouter=require('./routes/listing.js');
const userRouter=require('./routes/user.js');
const session =require('express-session');
const MongoStore = require('connect-mongo');
const flash =require('connect-flash');
const Listing=require('./models/listing.js');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');
const ejsMate=require("ejs-mate");
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
const DB_URL=process.env.ATLAS_DB_URL;
async function main(){
    await mongoose.connect(DB_URL);};
main().then(()=>{
    console.log("Connected to Database swastik_bnb");
}).catch((err)=>{
console.log(err)});
const methodOverride=require('method-override');
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const store=MongoStore.create({
    mongoUrl:DB_URL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on('ERROR',()=>{
    console.log('Error Occured In Session Store',err);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
});

app.use('/listings',listingRouter);
app.use('/listings/:id/reviews',reviewRouter);
app.use("/",userRouter);
app.get('/',(req,res)=>{
    res.render('./listings/loader.ejs');});
    app.post('/search', async (req, res) => {
        let cats = req.body.search;
        const AllListings = await Listing.find({
            $or: [
                { category: { $regex: cats, $options: 'i' } },
                { country: { $regex: cats, $options: 'i' } },
                { title: { $regex: cats, $options: 'i' } }, 
                { location: { $regex: cats, $options: 'i' } } 
            ]
        });
    
        res.render('./listings/category.ejs', { AllListings, cats });
    });
    
app.get('/rooms',async(req,res)=>{
    const AllListings=await Listing.find({category:'rooms'});
    let cats='Rooms';
    res.render('./listings/category.ejs',{AllListings,cats});
});
app.get('/iconic-cities',async(req,res)=>{
    const AllListings=await Listing.find({category:'iconic cities'});
    let cats='Iconic Cities'
    res.render('./listings/category.ejs',{AllListings,cats});
});
app.get('/castles',async(req,res)=>{
    const AllListings=await Listing.find({category:'castles'});
    let cats='Castles'
    res.render('./listings/category.ejs',{AllListings,cats});
});
app.get('/amazing-pools',async(req,res)=>{
    const AllListings=await Listing.find({category:'amazing pools'});
    let cats='Amazing Pools'
    res.render('./listings/category.ejs',{AllListings,cats});
});
app.get('/mountains',async(req,res)=>{
    const AllListings=await Listing.find({category:'mountains'});
    let cats='Mountains'
    res.render('./listings/category.ejs',{AllListings,cats});
});
app.get('/arctic',async(req,res)=>{
    const AllListings=await Listing.find({category:'arctic'});
    let cats='Arctic'
    res.render('./listings/category.ejs',{AllListings,cats});
});
app.get('/farms',async(req,res)=>{
    const AllListings=await Listing.find({category:'farms'});
    let cats='Farms';
    res.render('./listings/category.ejs',{AllListings,cats});
});
app.get('/camping',async(req,res)=>{
    const AllListings=await Listing.find({category:'camping'});
    let cats='Camping';
    res.render('./listings/category.ejs',{AllListings,cats});
});
app.get('/trending',async(req,res)=>{
    const AllListings=await Listing.find({category:'trending'});
    let cats='trending';
    res.render('./listings/category.ejs',{AllListings,cats});
})
app.get('/privacy',(req,res)=>{
    res.render('./listings/privacy'); });
app.get('/terms',(req,res)=>{
    res.render('./listings/terms.ejs');  });
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Exists or Not Found"));
})
app.use((err,req,res,next)=>{
    let {statusCode='500',message='Sorry Something Went Wrong'}=err; 
     res.status(statusCode).render('./listings/error.ejs',{err});    });    
app.listen(1234,()=>console.log("Port At 1234 "));