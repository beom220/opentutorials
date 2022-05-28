const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const helmet = require('helmet');
const db = require("./lib/db");
const authorRouter = require('./routes/author');
const topicRouter = require('./routes/topic');
const indexRouter = require('./routes/index');

const app = express();
const port = 3000;

// security
app.use(helmet());

// post data
//  01 Passport가 postdata를 받을 수 있도록 하기
app.use(bodyParser.urlencoded({extended: false}));

//session
//  02 Passport가 세션을 만들수있도록 하기
app.use(session({
    secret: 'asadlfkj!@#!@#dfgsdg',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

// Note passport는 session & bodyparser에 의존하고 있기때문에 세션을 활성화 시킨뒤에 호출되어야 한다.
const passport = require('./lib/passport')(app, db);

// custom middleware
app.get('*', (req, res, next) => {
    db.query(`SELECT name
              FROM author`, (err, authors) => {
        req.authors = authors;
        next();
    })
})

app.get('*', (req, res, next) => {
    // 모든 get 요청에 대해서 topic 테이블 저장
    db.query(`SELECT *
              FROM topic`, (error, topics) => {
        req.list = topics;
        next(); // 다음에 실행해야할 middleware 를 실행 할지 안할지 여부.
    });
});

// routes
// login
const registerRouter = require('./routes/register')(passport);

// author
app.use('/author', authorRouter);

// topic
app.use('/topic', topicRouter);

// main
app.get('/', indexRouter);

// not found page
app.use((req, res) => {
    res.status(404).send('Sorry find that');
});

// error page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`server listening to ${port}`)
});
