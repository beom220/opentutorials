const express = require('express');
const router = express.Router();
const template = require("../lib/template");
const register = require("../lib/register")


module.exports = (passport) => {
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


