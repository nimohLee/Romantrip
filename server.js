const express = require('express');
const path = require('path');
const db = require('./model/database');
const boardRoute = require('./routes/boardRoute');
const memberRoute = require('./routes/memberRoute');

const app = express();

const PORT  = 5001;

const date = new Date().toISOString().substring(0,10);

app.set("view engine","ejs");

/* use express middleware */
app.use(express.static(path.join(__dirname,'views')));
app.use('/assets/',express.static(path.join(__dirname,'assets')));
app.use('/css',express.static(path.join(__dirname,'css')));
app.use('/js',express.static(path.join(__dirname,'js')));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/",(req,res)=>{
    res.render('index');
});

app.use('/board',boardRoute);
app.use('/member',memberRoute); 


app.listen(PORT,()=>{console.log(`localhost:${PORT} is connected`)});