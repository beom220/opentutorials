const express = require('express');
const router = express.Router();
const db = require("../lib/db");
const template = require("../lib/template");
const path = require("path");

router.get('/logout_process', (req,res,next)=> {
    // 쿠키 정보 날림
    res.cookie('name','', {maxAge: 0})
        .cookie('profile','',{maxAge: 0});
    res.redirect('/');

});

router.post('/login_process', (req,res,next)=> {
    const post = req.body;
    const name = post.name;
    const profile = post.profile;

    db.query(`SELECT * FROM author WHERE name=?`, [name], (err, author) => {
        if(err) next(err);
        if(profile !== author[0].profile){ // 여기서는 프로필이지만 패스워드임,
            res.end('Wrong profile')
        }
        // 로그인 성공
        res.cookie('name',name).cookie('profile',profile);
        res.redirect('/');
    })
});

router.get('/', (req,res,next)=> {
    const title = '로그인';
    const body = `
        <form action="/login/login_process" method="post">
            <p>
                <input type="text" name="name" placeholder="name">
            </p>
            <p>
                <input type="text" name="profile" placeholder="profile"/>
            </p>
            <p>
                <input type="submit" value="login">
            </p>
        </form>`;
    const html = template.HTML(title, null, body, null);
    res.send(html);
});

module.exports = router;