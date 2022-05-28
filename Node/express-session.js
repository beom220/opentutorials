const express = require('express');
const parseurl = require('parseurl');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

// let fileStoreOptions = {};

app.use(session({
    store: new FileStore(),
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true
}))

app.get('/', function (req, res, next) {
    if(!req.session.num){
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }
    res.send(`Views : ${req.session.num}`);
})

app.listen(3000, function(){
    console.log('3000!');
});