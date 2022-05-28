const express = require('express');
const router = express.Router();
const template = require("../lib/template");
const register = require("../lib/register")


router.get('/logout', (req, res, next) =>{
    req.logout((err)=>{
        if(err) next(err);
        req.session.save(() => {
            res.redirect('/');
        })
    });
})

router.get('/', (req,res,next)=> {
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
    const html = template.HTML(title, null, body, null, register.statusUI(req,res));
    res.send(html);
});

module.exports = router;

// router.post('/logout', (req,res)=> {
//     req.logout();
//     req.session.save(() => {
//         res.send('why');
//     })
// });

/* Note passport를 사용하면서 아래 기능을 대체
router.post('/login_process', (req,res,next)=> {
    const post = req.body;
    const email = post.email;
    const password = post.password;
    let chkEmail = [];
    db.query(`SELECT email FROM author`, (err, emails) => {
        if(err) throw err;
        chkEmail = emails.filter(v => {
            return v.email === email;
        })
        if(chkEmail.length === 0){
            return res.end('EMAIL ERR');
        }
        if(chkEmail.length >= 1){
            db.query(`SELECT password FROM author WHERE email=?`,[email], (err2, pwd) => {
                if(err2) throw err2;
                if(pwd[0].password !== password) return res.end('PWD ERR');
                if(pwd[0].password === password) return res.redirect('/');
            })
        }
    })
});
 */

