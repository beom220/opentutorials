const express = require('express');
const router = express.Router();
const template = require("../lib/template");
const register = require("../lib/register")
const db = require("../lib/db");


module.exports = (passport) => {
    router.post('/create_process', (req,res)=>{
        const post = req.body;
        const { name, email, password, password2, profile } = post;

        if(!name || !email || !password || !password2 || !profile){
            console.log('값이 없음');
            return res.redirect('/login/create');
        }

        if(password !== password2){
            console.log('비밀번호1과 2가 다름');
            return res.redirect('/login/create');
        }

        db.query(`SELECT email FROM author`, (err, rows) => {
            if(err) throw err;
            const user = rows.filter(v => email === v.email);
            if(!!user.length) {
                console.log('이미 쓰고있는 이메일');
                return res.redirect('/login/create');
            }

            // Insert Into DB
            db.query(`INSERT INTO author (name, email, password, profile) VALUES (?, ?, ?, ?)`,
                [name, email, password, profile],
                (err2, row) => {
                    if(err2) throw err2;
                    res.redirect(302, '/');
                }
            )
        })
    })

    router.get('/create',(req, res,next) => {
        const title = 'register';
        const body = `
        <form action="/login/create_process" method="post">
            <p><input type="text" name="name" placeholder="name"></p>
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="text" name="password" placeholder="password"></p>
            <p><input type="text" name="password2" placeholder="password check"></p>
            <p><textarea name="profile" placeholder="profile"></textarea></p>
            <p><input type="submit" value="register"></p>
        </form>
    `
        const html = template.HTML(title, null, body, null, register.statusUI(req,res));
        res.send(html);
    });

    router.post('/login_process', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        }
    ))

    router.get('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) next(err);
            req.session.save(() => {
                res.redirect('/');
            })
        });
    })

    router.get('/', (req, res, next) => {
        const title = '로그인';
        const body = `
        <form action="/login/login_process" method="post">
            <p>
                <input type="text" name="email" placeholder="email">
            </p>
            <p>
                <input type="text" name="password" placeholder="password"/>
            </p>
            <p>
                <input type="submit" value="login">
            </p>
        </form>`;
        const html = template.HTML(title, null, body, null, register.statusUI(req, res));
        res.send(html);
    });

    return router;
}


// module.exports = router;


