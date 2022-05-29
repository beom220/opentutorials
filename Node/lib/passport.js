const passport = require("passport");
const {Strategy: LocalStrategy} = require("passport-local");

module.exports = (app, db) => {
//  03 Passport 불러오기
    app.use(passport.initialize());
    app.use(passport.session());

//  06 전달받은 data를 세션Store에 저장
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });
//  07 페이지방문시 세션Store정보를 조회
    passport.deserializeUser((id, done) => {
        db.query(`SELECT email, password, name FROM author WHERE email=?`, [id], (err, row)=> {
            if(err) return done(null, false, {message : 'Sql Error'});
            done(null, row[0]);
        })
    })

//  05 전달받은 data를 인증하고 세션으로 전달
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            db.query(`SELECT email FROM author` , (err, rows) => {
                if(err) return done(null, false, {message : 'Sql Error'});
                // email 전체를 가져와서 입력값이 일치하는것 배열로 저장
                const user = rows.filter(v => v.email === email);
                // 일치하지 않다면 이메일 에러
                if(!user) return done(null, false, {message : 'email error'});

                db.query(`SELECT email, password FROM author WHERE email=?`, [email], (err2, row) => {
                    if(err2) return done(null, false, {message : 'Sql Error'});
                    if(password !== row[0].password) return done(null, false, {message: 'error pw'});

                    return done(null, row[0]);
                })
            })
        }
    ))
    return passport;
}
