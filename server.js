const express = require('express');
const path = require('path');
const boardRoute = require('./routes/board');
const userRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const cors = require("cors");
const { sequelize } = require('./database/models/index')
const session = require('express-session');
const FileStore = require('session-file-store')(session);


const app = express();
const PORT  = 5001;

sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch(err => console.error('occurred error in database connecting', err))


app.set("view engine","ejs");

/* use express middleware */

app.use('/',express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use(session({
  store: new FileStore(),
  secret: 'keyboard dogcatdog',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000,secure: false, httpOnly: true }
}))


app.get("/",(req,res)=>{
    res.render('index',{session : req.session._id});
});

app.use('/board',boardRoute);
app.use('/users',userRoute); 
app.use("/login",loginRoute);



app.listen(PORT,()=>{console.log(`localhost:${PORT} is connected`)});