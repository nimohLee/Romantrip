const express = require('express');
const path = require('path');
const boardRoute = require('./routes/board');
const memberRoute = require('./routes/users');

const app = express();

const PORT  = 5001;

app.set("view engine","ejs");

/* use express middleware */
app.use(express.static(path.join(__dirname,'views')));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/",(req,res)=>{
    res.render('index');
});

app.use('/board',boardRoute);
app.use('/member',memberRoute); 


app.listen(PORT,()=>{console.log(`localhost:${PORT} is connected`)});