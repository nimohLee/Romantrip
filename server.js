const express = require('express');
const path = require('path');
const boardRoute = require('./routes/board');
const userRoute = require('./routes/users');
const snsRoute = require('./routes/snsLogin');
const cors = require("cors");
const { sequelize } = require('./database/models/index')
const session = require('express-session');

const app = express();

const PORT  = 5001;

sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch(err => console.error('occurred error in database connecting', err))


app.set("view engine","ejs");

/* use express middleware */
app.use(express.static(path.join(__dirname,'views')));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.get("/",(req,res)=>{
    res.render('index');
});

app.use('/board',boardRoute);
app.use('/users',userRoute); 
app.use("/snsLogin",snsRoute);
app.use(session({
  secret: 'your session secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.listen(PORT,()=>{console.log(`localhost:${PORT} is connected`)});