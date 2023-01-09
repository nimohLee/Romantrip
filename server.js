const express = require('express');
const path = require('path');
require("dotenv").config();
const cookieParser = require("cookie-parser");

/* import Routes */
const boardRoute = require('./routes/board');
const userRoute = require('./routes/users');
const playRoute = require('./routes/play');
const eatRoute = require('./routes/eat');
const cartRoute = require('./routes/cart');

const cors = require("cors");
const { sequelize } = require('./database/models/index')
const session = require('express-session');

const FileStore = require('session-file-store')(session);

const app = express();
const PORT  = process.env.SERVER_PORT;

sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch(err => console.error('occurred error in database connecting', err))


app.set("view engine","ejs");

/* use express middleware */

/* 라우팅 경로 지정 해주지 않을 경우 브라우저에서 간헐적으로 get 요청 실패함 */
app.use('/assets',express.static(path.join(__dirname,'public/assets')));
app.use('/css',express.static(path.join(__dirname,'public/css')));
app.use('/js',express.static(path.join(__dirname,'public/js')));
app.use(express.static(path.join(__dirname,'views')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());

app.use(session({
  store: new FileStore({logFn: function(){}}),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000, secure: false, httpOnly: true }
}))


app.get("/",(req,res)=>{
    res.render('index',{session : req.session._id});
});

app.use('/board',boardRoute);
app.use('/users',userRoute); 
app.use("/play",playRoute);
app.use("/eat",eatRoute);
app.use("/cart",cartRoute);


/* 404 error  */
app.use(function(req, res, next) {
  res.status(404).render("errors/404");
});

/* 500 error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render("errors/500");
});


app.listen(PORT,()=>{console.log(`Running...`)});