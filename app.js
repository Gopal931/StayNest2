if(process.env.NODE_ENV != 'production'){
require('dotenv').config();
}

const express=require('express');
const app=express();

const mongoose=require('mongoose');
const path=require('path');
app.use(express.urlencoded({extended:true}));   // for parsing application/x-www-form-urlencoded or to parse ll the  data which comes with request
const methodOverride = require('method-override');  // for using PUT and DELETE methods in forms
app.use(methodOverride('_method'));  // this will allow us to use PUT and DELETE methods in forms by adding a hidden input field with name _method
const ejsmate =require('ejs-mate');
app.use(express.static(path.join(__dirname, "/public")))  // for serving static files like css, js, images etc.
const { console } = require('inspector');
app.use(express.json());
const flash=require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
 const passport=require('passport');
 const LocalStrategy=require('passport-local');
 const User=require('./models/user.js');
const ExpressError=require('./utils/ExpressError.js') 


// const mongoose_url="mongodb://127.0.0.1:27017/test"
const dbUrl=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    mongoose.connect(dbUrl);
}

app.set('view engine','ejs');  //so we can render('index)
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsmate);  // this will allow us to use ejs as a template engine

// app.get('/',(req,res)=>{
//     res.sendFile('index.html');
// })



const listingRouter=require("./routes/listing.js");
const reviewRouter=require('./routes/review.js');
const userRouter=require('./routes/user.js');

const store=MongoStore.create({
   mongoUrl:dbUrl,
   crypto:{
   secret:process.env.SECRET,
   },
   touchAfter:24*36000,
});

store.on('error',(err)=>{
  console.log("ERROR IN MONGO SESION STORE",err);
})
const sessionOptions={
  store,                
secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now() + 7 * 24 *60 * 60* 1000,
      maxAge: 7 * 24 *60 * 60* 1000,
      httpOnly:true,   //use this to stay safe from cross scripting attack
    } 
}




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash('success');
  res.locals.error=req.flash('error');
  res.locals.currUser=req.user;
  next();
})



app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


// app.get('/testListing',async(req,res)=>{
//     const sampleListing=new Listing({
//         title: "Sample Listing",
//         description: "This is a sample listing for testing purposes.",
//         price: 100,
//         location: "New York",
//         country: "USA"
//     });
//     await sampleListing.save();
//     res.send("Sample listing created successfully");
//     console.log("Sample listing created successfully");
// })


//show route











// app.all('*', (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error", { err });
});


app.listen(8080 ,(req,res)=>{
console.log("Server is running on port 8080");
})

