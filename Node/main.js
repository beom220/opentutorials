const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const db = require("./lib/db");
const authorRouter = require('./routes/author');
const topicRouter = require('./routes/topic');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register')

const app = express();
const port = 3000;

// security
app.use(helmet());
// cookie
app.use(cookieParser());
// post data
app.use(bodyParser.urlencoded({ extended: false }));

// custom middleware
app.get('*', (req, res, next)=>{
    db.query(`SELECT name FROM author`, (err, authors)=> {
        req.authors = authors;
        next();
    })
})

app.get('*', (req,res,next) => {
    // 모든 get 요청에 대해서 topic 테이블 저장
    db.query(`SELECT * FROM topic`, (error, topics) => {
        req.list = topics;
        next(); // 다음에 실행해야할 middleware 를 실행 할지 안할지 여부.
    });
});

// routes
// login
app.use('/login', registerRouter);

// author
app.use('/author', authorRouter);

// topic
app.use('/topic', topicRouter);

// main
app.get('/', indexRouter);

// not found page
app.use((req,res)=>{
    res.status(404).send('Sorry find that');
});

// error page
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`server listening to ${port}`)
});
