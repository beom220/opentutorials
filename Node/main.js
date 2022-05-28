const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helmet = require('helmet');
const db = require("./lib/db");
const authorRouter = require('./routes/author');
const topicRouter = require('./routes/topic');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');

const app = express();
const port = 3000;

// security
app.use(helmet());

// post data
// TODO 01 Passport가 postdata를 받을 수 있도록 하기
app.use(bodyParser.urlencoded({ extended: false }));

//session
// TODO 02 Passport가 세션을 만들수있도록 하기
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))
// 사용자 정보
const authData = {
    email : 'master@gmail.com',
    password : 'qwer1234',
}
// Note passport는 session & bodyparser에 의존하고 있기때문에 세션을 활성화 시킨뒤에 호출되어야 한다.
// TODO 03 Passport 불러오기
app.use(passport.initialize());
app.use(passport.session());

// TODO 06 전달받은 data를 세션Store에 저장
passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user.email);
});
// TODO 07 페이지방문시 세션Store정보를 조회
passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    done(null, authData);
})

// TODO 05 전달받은 data를 인증하고 세션으로 전달
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        if(username === authData.email){
            console.log(1);
            if(password === authData.password){
                console.log(2);
                return done(null, authData);
            } else {
                console.log(3);
                return done(null, false, {
                    message: 'Incorrect password.'
                })
            }
        } else {
            console.log(4);
            return done(null, false, {
                message: 'Incorrect username.'
            })
        }
    }
))

// TODO 04 postdata를 Passport로 전달하기
app.post('/login/login_process',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }))

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
