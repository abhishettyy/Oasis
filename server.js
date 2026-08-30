require('dotenv').config()
const methodOverride = require('method-override');
const dbConnect = require('./config/db.js')
dbConnect();
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const wrap = require('./utils/asyncWrap.js');
const listRouter = require('./routes/listing.js');
const errorfn = require('./controllers/error.js');
const passport = require('passport');
const LocalStratergy = require('passport-local')
const User = require('./models/User.js') 
const notfound = require('./controllers/notfound.js')
const signinRouter = require('./routes/signin.js')
const signupRouter = require('./routes/signup.js')
const logout = require('./controllers/logout.js')
const flash = require('connect-flash')
const { MongoStore } = require('connect-mongo');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const gglstat = require('./controllers/googleStratergy.js')
const deserialize = require('./controllers/deserialize.js')
const authGoogle = require('./controllers/googleauth.js')
const flashMiddleware = require('./controllers/flashMiddleware.js')
const { getProfile, updateProfile } = require('./controllers/profile.js');
app.use(methodOverride("_method"));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl: 14 * 24 * 60 * 60
    })
}));

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStratergy(User.authenticate()))

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
}, gglstat))

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(deserialize);

app.use(flashMiddleware)
app.get('/auth/google' , passport.authenticate('google' , {
    scope: ["profile", "email"]
})
)

app.get(
    "/auth/google/callback",
    authGoogle
   ,
    (req, res) => {
        res.redirect("/listings");
    }
);

app.use('/listings' , listRouter);
app.use('/signin' , signinRouter)
app.use('/signup',signupRouter)
app.get('/profile', getProfile)
app.post('/profile', wrap(updateProfile))
app.get('/logout',logout)
app.all("/{*splat}", notfound)
app.use(errorfn)


app.listen(8000,()=>{
    console.log('Listening to the port 8000')
});